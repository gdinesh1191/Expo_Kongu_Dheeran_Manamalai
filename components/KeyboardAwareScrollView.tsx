import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  ScrollViewProps,
  TextInput,
  View,
} from "react-native";

interface Props extends ScrollViewProps {
  extraScrollHeight?: number;
  paddingBottom?: number;
}

const KeyboardAwareScrollView = forwardRef<ScrollView, Props>(function KeyboardAwareScrollView(
  {
    children,
    extraScrollHeight = 100,
    contentContainerStyle,
    paddingBottom,
    onScroll,
    ...props
  },
  ref,
) {
  const scrollRef = useRef<ScrollView>(null);
  useImperativeHandle(ref, () => scrollRef.current as ScrollView);
  const contentRef = useRef<View>(null);

  // Current ScrollView scroll position
  const scrollYRef = useRef(0);

  // Current keyboard top position
  const keyboardTopRef = useRef<number | null>(null);

  const measureRetryRef = useRef(0);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const scrollToY = (y: number) => {
    const nextY = Math.max(y, 0);

    /**
     * Keep the tracked offset in sync immediately.
     * Waiting only for onScroll can leave a stale
     * value if the next field is focused quickly.
     */
    scrollYRef.current = nextY;

    scrollRef.current?.scrollTo({
      y: nextY,
      animated: true,
    });
  };

  /**
   * Scroll currently focused TextInput into the
   * visible area above the keyboard.
   *
   * Uses content-relative layout so fields that
   * are scrolled off the TOP (not just the bottom)
   * can still be brought back into view.
   */
  const scrollToFocusedInput = () => {
    const focusedInput = TextInput.State.currentlyFocusedInput();
    const keyboardTop = keyboardTopRef.current;
    const contentNode = contentRef.current;

    if (!focusedInput || keyboardTop === null || !contentNode) {
      return;
    }

    (scrollRef.current as unknown as View | null)?.measureInWindow(
      (_x: number, scrollViewY: number) => {
        focusedInput.measureLayout(
          contentNode,
          (
            _inputX: number,
            inputY: number,
            _inputWidth: number,
            inputHeight: number,
          ) => {
            /**
             * Space required above the input
             * for:
             *
             * Label
             * +
             * margin
             */
            const labelSpace = 45;
            const topPadding = 12;

            /**
             * Visible band inside the ScrollView,
             * from the ScrollView top down to just
             * above the keyboard.
             */
            const visibleHeight = keyboardTop - scrollViewY - extraScrollHeight;

            if (visibleHeight <= 0) {
              return;
            }

            measureRetryRef.current = 0;

            const currentScroll = scrollYRef.current;
            const labelTop = inputY - labelSpace;
            const inputBottom = inputY + inputHeight;

            const visibleTop = currentScroll + topPadding;
            const visibleBottom = currentScroll + visibleHeight;

            /**
             * --------------------------------
             * INPUT / LABEL TOO LOW
             * --------------------------------
             *
             * Move the field upward.
             */
            if (inputBottom > visibleBottom) {
              scrollToY(inputBottom - visibleHeight);
              return;
            }

            /**
             * --------------------------------
             * INPUT / LABEL TOO HIGH
             * --------------------------------
             *
             * Field was scrolled off the top
             * (e.g. user focused a lower field
             * first). Move the field downward
             * so the label is visible again.
             */
            if (labelTop < visibleTop) {
              scrollToY(labelTop - topPadding);
            }
          },
          () => {
            /**
             * measureLayout can fail on the first
             * frame after focus. Retry a few times.
             */
            if (measureRetryRef.current < 3) {
              measureRetryRef.current += 1;
              setTimeout(scrollToFocusedInput, 50);
            }
          },
        );
      },
    );
  };

  /**
   * Handle keyboard open / close
   */
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    /**
     * Keyboard SHOW
     */
    const keyboardShowSubscription = Keyboard.addListener(
      showEvent,
      (event) => {
        setKeyboardVisible(true);

        /**
         * Get actual keyboard top position.
         *
         * This is better than using a fixed
         * keyboard height because iOS and Android
         * keyboards can have different heights.
         */
        keyboardTopRef.current = event.endCoordinates.screenY;

        /**
         * Wait for layout adjustment.
         *
         * iOS needs a little more time.
         */
        setTimeout(
          () => {
            scrollToFocusedInput();
          },
          Platform.OS === "ios" ? 300 : 150,
        );
      },
    );

    /**
     * Keyboard HIDE
     */
    const keyboardHideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
      keyboardTopRef.current = null;
    });

    return () => {
      keyboardShowSubscription.remove();
      keyboardHideSubscription.remove();
    };
  }, [extraScrollHeight]);

  /**
   * Handle input focus
   *
   * Important:
   *
   * When keyboard is already open and user taps
   * another input, keyboardWillShow / keyboardDidShow
   * may NOT fire again.
   *
   * Therefore we handle focus separately.
   */
  const handleFocus = () => {
    /**
     * Keyboard isn't open yet.
     *
     * keyboardShow event will handle scrolling.
     */
    if (keyboardTopRef.current === null) {
      return;
    }

    /**
     * Keyboard is already open.
     *
     * Wait for the focused input layout to settle.
     */
    setTimeout(() => {
      scrollToFocusedInput();
    }, 100);
  };

  /**
   * Track ScrollView position
   */
  const handleScroll = (event: any) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;

    /**
     * Preserve user's onScroll callback.
     */
    onScroll?.(event);
  };

  return (
    <ScrollView
      ref={scrollRef}
      {...props}
      onFocus={handleFocus}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          /**
           * When keyboard is closed:
           *
           * Keep only enough space so the last
           * section doesn't touch the fixed button.
           */
          paddingBottom: keyboardVisible
            ? /**
               * Keyboard OPEN
               *
               * Give the ScrollView enough extra
               * content height so the last input
               * can be moved above the keyboard.
               */
              Math.max(350, extraScrollHeight + 150)
            : /**
               * Keyboard CLOSED
               */
              paddingBottom
              ? paddingBottom
              : 80,
        },
        contentContainerStyle,
      ]}
    >
      <View ref={contentRef} collapsable={false}>
        {children}
      </View>
    </ScrollView>
  );
});

export default KeyboardAwareScrollView;
