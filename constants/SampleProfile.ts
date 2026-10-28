import { ImageSourcePropType } from "react-native";

export type Profile = {
  id: string;
  name: string;
  Koottam: string;
  Porutham: string;
  dob: string;
  EducationCourse: string;
  EducationSpecification?: string;
  WorkingCategory?: string;
  location: string;
  Designation: string;
  CompanyName?: string;
  MonthlyIncome?: string;
  WorkingPlace?: string;
  WorkingCountry?: string;
  photos?: (ImageSourcePropType | string)[];
  Height?: string;
  MaritalStatus?: string;
  Horoscope?: string;
  KulaTheivam?: string;
  Complex?: string;
  BirthPlace?: string;
  FatherName?: string;
  FatherOccupation?: string;
  MotherName?: string;
  MotherOccupation?: string;
  SiblingsCount?: string;
  Property?: string[];
  expectations?: string;
  AboardExpectation?: string;
  Note?: string;
  Rashi?: string;
  Star?: string;
  Laknam?: string;
  horoscopeImage?: ImageSourcePropType | string;
  ThisaIruppu?: string;
  Year?: string;
  Month?: string;
  Day?: string;
  Poruthams: string[];
};

export const SAMPLE_PROFILES: Profile[] = [
  {
    id: "TG30930",
    name: "Dr.S.Durga",
    Koottam: "Koorai",
    Porutham: "Mathimam",
    dob: "10-04-2001",
    EducationCourse: "M.D.S.",
    EducationSpecification: "",
    WorkingCategory: "Not Working",
    location: "Nattampalayam, Sankagiri",
    Designation: "N/A",
    photos: [
      require("../assets/Images/durga2.png"),
      require("../assets/Images/durga.png"),
    ],
    Height: "171 cm",
    MaritalStatus: "First Marriage",
    Horoscope: "Sutham",
    KulaTheivam: "Padaiveedu Athanur Amman",
    Complex: "Fair",
    BirthPlace: "Pallipalayam",
    FatherName: "Suresh",
    FatherOccupation: "Business",
    MotherName: "Jothilakshmi",
    MotherOccupation: "Home Maker",
    SiblingsCount: "No Siblings",
    Property: ["RC House -1", "Own House -1", "2 Plots", "Lorry -5."],
    expectations: "Doctor Or Business",
    AboardExpectation: "Not Yet Decided",
    Note: "Studying MDS Second Year",
    Rashi: "Thulam",
    Star: " Visakam 3",
    Laknam: "Thulam",
    horoscopeImage: require("../assets/Images/durgaKattam.png"),
    ThisaIruppu: "Jupiter",
    Year: "05",
    Month: "04",
    Day: "04",
    Poruthams: [
      "Thinam",
      "Kanam",
      "Sthritheerkam",
      "Rasi",
      "Rasi Athipathi",
      "Rajju",
      "Vethai",
    ],
  },

  {
    id: "GT30933",
    name: "S.Vidhya",
    Koottam: "Semboothan",
    Porutham: "Uthamam",
    dob: "04-04-2001",
    EducationCourse: "B.E",
    EducationSpecification: "",
    WorkingCategory: "Private Job",
    location: "K.K.Valasu, Rasipuram",
    Designation: "Software",
    photos: [
      require("../assets/Images/vidhya2.png"),
      require("../assets/Images/vidhya.png"),
      require("../assets/Images/vidhya3.png"),
    ],
    Height: "165 cm",
    MaritalStatus: "First Marriage",
    Horoscope: "Sutham",
    KulaTheivam: "Pillanallur Chettikumarasaami",
    Complex: "Fair",
    BirthPlace: "Salem",
    FatherName: "R.Saravanan",
    FatherOccupation: "Workshop - Mallur",
    MotherName: "P. Chitra",
    MotherOccupation: "Home Maker",
    SiblingsCount: "Younger Brother -1",
    Property: ["RC House -1", "1.5 Acres Agri Land"],
    expectations: "Software, Basic Property",
    AboardExpectation: "Not Willing",
    Note: "",
    Rashi: "Kadagam",
    Star: " Ayilyam 2",
    Laknam: "Kumbam",
    horoscopeImage: require("../assets/Images/vidhyaKattam.png"),
    ThisaIruppu: "Mercury",
    Year: "08",
    Month: "06",
    Day: "27",
    Poruthams: [
      "Kanam",
      "Mahendiram",
      "Yoni",
      "Rasi Athipathi",
      "Rajju",
      "Vethai",
    ],
  },

  {
    id: "TG30929",
    name: "S.Preetha",
    Koottam: "Sengunni",
    Porutham: "Uthamam",
    dob: "20-02-2001",
    EducationCourse: "M.Sc",
    EducationSpecification: "",
    WorkingCategory: "Private Job",
    location: "Vattur, Tiruchengode",
    Designation: "Teacher",
    photos: [
      require("../assets/Images/preetha2.png"),
      require("../assets/Images/preetha.png"),
      require("../assets/Images/preetha3.png"),
    ],
    Height: "159 cm",
    MaritalStatus: "First Marriage",
    Horoscope: "Sutham",
    KulaTheivam: "Vattur Athayee Amman",
    Complex: "Brown",
    BirthPlace: "Erode",
    FatherName: "S.Saravanan",
    FatherOccupation: "Agriculture",
    MotherName: "S.உதயரதி",
    MotherOccupation: "Home Maker",
    SiblingsCount: "Younger Brother -1",
    Property: ["RC House -1", "15 Acres Agri Land"],
    expectations: " Good Job Or Business, Basic Property",
    AboardExpectation: "Not Yet Decided",
    Note: "",
    Rashi: "Makaram",
    Star: " Uthiradam 4",
    Laknam: "Kadagam",
    horoscopeImage: require("../assets/Images/preethaKattam.png"),
    ThisaIruppu: "Sun",
    Year: "01",
    Month: "03",
    Day: "03",
    Poruthams: [
      "Thinam",
      "Kanam",
      "Mahendiram",
      "Sthritheerkam",
      "Yoni",
      "Rasi",
      "Rasi Athipathi",
      "Rajju",
      "Vethai",
    ],
  },

  {
    id: "30937",
    name: "S.Monica",
    Koottam: "Payiran",
    Porutham: "Mathimam",
    dob: "28-02-2002",
    EducationCourse: "M.B.B.S",
    EducationSpecification: "",
    WorkingCategory: "Not Working",
    location: "Kallakurichi, Kallakurichi",
    Designation: "N/A",
    photos: [
      require("../assets/Images/monica2.png"),
      require("../assets/Images/monica.png"),
      require("../assets/Images/monica3.png"),
    ],
    Height: "168 cm",
    MaritalStatus: "First Marriage",
    Horoscope: "Sutham",
    KulaTheivam: "Olapalayam Karuppanar, Rackiyannan",
    Complex: "Fair",
    BirthPlace: "Pudukkottai",
    FatherName: "R.Sadhasivam",
    FatherOccupation: "Private Job",
    MotherName: "S.Devika",
    MotherOccupation: "Home Maker",
    SiblingsCount: "Younger Sister -1 (MBBS)",
    Property: [
      "Floor House -3",
      "8 Acres Agri Land",
      "Plots -8",
      "(Approx. Asset Value 20 Crores)",
    ],
    expectations: "Doctor Or Business",
    AboardExpectation: "Not Yet Decided",
    Note: "",
    Rashi: "Simmam",
    Star: " Pooram 4",
    Laknam: "Kumbam",
    horoscopeImage: require("../assets/Images/monicaKattam.png"),
    ThisaIruppu: "Venus",
    Year: "2",
    Month: "6",
    Day: "3",
    Poruthams: ["Kanam", "Yoni", "Vasiyam", "Rajju", "Vethai"],
  },

  {
    id: "30932",
    name: "R.Vinupriya",
    Koottam: "Semboothan",
    Porutham: "No Rajju Porutham",
    dob: "10-06-2002",
    EducationCourse: "B.SC., M.Tech",
    EducationSpecification: "",
    WorkingCategory: " Private Job",
    location: "Masakkalipatty, Rasipuram",
    Designation: "Software",
    photos: [
      require("../assets/Images/Vinupriya2.png"),
      require("../assets/Images/Vinupriya.png"),
    ],
    Height: "168 cm",
    MaritalStatus: "First Marriage",
    Horoscope: "Sutham",
    KulaTheivam: "Koonavelampattiputhur Aliya Ilangaiyamman",
    Complex: "Fair",
    BirthPlace: "Dharmapuri",
    FatherName: "N.Rajendhiran",
    FatherOccupation: "Manager At Poultry Farm",
    MotherName: "R.Kavitha",
    MotherOccupation: "Home Maker",
    SiblingsCount: "Younger Sister -1",
    Property: ["RC House-1", "Plots -2"],
    expectations: " Software Priority Or Other Good Job",
    AboardExpectation: "Not Yet Decided",
    Note: "",
    Rashi: "Rishapam",
    Star: "  Rohini 3",
    Laknam: "Kanni",
    horoscopeImage: require("../assets/Images/vinupriyaKattam.png"),
    ThisaIruppu: "Moon",
    Year: "3",
    Month: "11",
    Day: "22",
    Poruthams: [],
  },
];

export type MyProfileData = Profile & {
  stats: { sent: number; received: number; shortlisted: number };
  completeness: number;
  completenessHint: string;
};

export const MY_PROFILE: MyProfileData = {
  id: "33246",
  name: "P.Kumaresan",
  Koottam: "Panangaadai",
  Porutham: "Mathimam",
  dob: "03-02-1983",
  EducationCourse: "B.A",
  EducationSpecification: "",
  WorkingCategory: "Business",
  location: "Andagalur Gate",
  Designation: "N/A",
  photos: [require("../assets/Images/Kumaresan.png")],
  Height: " 174 cm",
  MaritalStatus: "First Marriage",
  Horoscope: "Sutham",
  KulaTheivam: "Konnaiyar Selliyamman",
  Complex: "Fair",
  BirthPlace: "Rasipuram",
  FatherName: "",
  FatherOccupation: "",
  MotherName: "",
  MotherOccupation: "",
  SiblingsCount: "",
  Property: [],
  expectations: "",
  AboardExpectation: "",
  Note: "",
  Rashi: "Thulam",
  Star: " Swathi 1",
  Laknam: "Kanni",
  horoscopeImage: "",
  ThisaIruppu: "",
  Year: "",
  Month: "",
  Day: "",
  Poruthams: [],
  stats: { sent: 24, received: 18, shortlisted: 12 },
  completeness: 85,
  completenessHint: "Add 2 more photos to reach 100%",
};
