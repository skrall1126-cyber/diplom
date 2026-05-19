// Course data for the current student's online learning section.
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  lessons: number;
  totalLessons?: number;
  completedLessons?: number;
  lessonList?: Lesson[];
  progress?: number;
  short?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "quiz" | "assignment";
  completed: boolean;
}

export const courses: Course[] = [
  {
    id: "python-basics",
    title: "Python undes",
    description: "Python хэлний үндсэн ойлголт, хувьсагч, нөхцөл, давталт, функц болон жижиг төслийн дадлага.",
    instructor: "Dr. Batjargal",
    duration: "16 weeks",
    level: "Beginner",
    category: "Programming",
    rating: 4.8,
    students: 32,
    price: 0,
    image: "/courses/python.jpg",
    lessons: 24,
    totalLessons: 24,
    completedLessons: 22,
    short: "PY",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "JavaScript синтакс, DOM, event, asynchronous programming болон web interaction-ийн дадлага.",
    instructor: "Ts. Enkhtuya",
    duration: "16 weeks",
    level: "Beginner",
    category: "Programming",
    rating: 4.9,
    students: 32,
    price: 0,
    image: "/courses/javascript.jpg",
    lessons: 20,
    totalLessons: 20,
    completedLessons: 17,
    short: "JS",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Сүлжээний үндэс, OSI/TCP-IP загвар, IP хаяглалт, routing болон basic network security.",
    instructor: "Prof. Bold",
    duration: "16 weeks",
    level: "Intermediate",
    category: "Network",
    rating: 4.7,
    students: 32,
    price: 0,
    image: "/courses/networking.jpg",
    lessons: 16,
    totalLessons: 16,
    completedLessons: 14,
    short: "NET",
  },
  {
    id: "database",
    title: "Database",
    description: "Өгөгдлийн сангийн загварчлал, SQL query, normalization, transaction болон database design.",
    instructor: "B. Munkhbat",
    duration: "16 weeks",
    level: "Intermediate",
    category: "Database",
    rating: 4.6,
    students: 32,
    price: 0,
    image: "/courses/database.jpg",
    lessons: 22,
    totalLessons: 22,
    completedLessons: 18,
    short: "DB",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX design",
    description: "Хэрэглэгчийн судалгаа, wireframe, prototype, design system болон usability test-ийн дадлага.",
    instructor: "A. Nomin",
    duration: "16 weeks",
    level: "Intermediate",
    category: "Design",
    rating: 4.5,
    students: 32,
    price: 0,
    image: "/courses/ui-ux.jpg",
    lessons: 14,
    totalLessons: 14,
    completedLessons: 13,
    short: "UX",
  },
  {
    id: "cyber-security",
    title: "Cyber security",
    description: "Мэдээллийн аюулгүй байдлын үндэс, threat model, vulnerability, defense аргачлалын дадлага.",
    instructor: "Dr. Turtumur",
    duration: "16 weeks",
    level: "Intermediate",
    category: "Security",
    rating: 4.9,
    students: 32,
    price: 0,
    image: "/courses/cybersecurity.jpg",
    lessons: 20,
    totalLessons: 20,
    completedLessons: 15,
    short: "SEC",
  },
  {
    id: "java-fundamentals",
    title: "Java fundamentals",
    description: "Java хэлний OOP, class, object, collection, exception болон console application-ийн дадлага.",
    instructor: "D. Erdene",
    duration: "16 weeks",
    level: "Beginner",
    category: "Programming",
    rating: 4.6,
    students: 32,
    price: 0,
    image: "/courses/java.jpg",
    lessons: 16,
    totalLessons: 16,
    completedLessons: 13,
    short: "JAVA",
  },
  {
    id: "react-development",
    title: "React development",
    description: "React component, state, props, hooks, routing, Next.js болон TypeScript ашигласан web app хөгжүүлэлт.",
    instructor: "Ts. Enkhtuya",
    duration: "16 weeks",
    level: "Intermediate",
    category: "Web Development",
    rating: 4.8,
    students: 32,
    price: 0,
    image: "/courses/react.jpg",
    lessons: 16,
    totalLessons: 16,
    completedLessons: 14,
    short: "RE",
  },
  {
    id: "linux-administration",
    title: "Linux administration",
    description: "Linux command line, file permission, process, package, service болон server administration-ийн үндэс.",
    instructor: "G. Temuulen",
    duration: "16 weeks",
    level: "Intermediate",
    category: "System Administration",
    rating: 4.7,
    students: 32,
    price: 0,
    image: "/courses/linux.jpg",
    lessons: 16,
    totalLessons: 16,
    completedLessons: 14,
    short: "LX",
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter((course) => course.category === category);
};

export const getFeaturedCourses = (limit: number = 4): Course[] => {
  return courses.slice(0, limit);
};
