"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function PythonBasicsCourse() {
  const [activeMenu, setActiveMenu] = useState("Python Basics");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [userType, setUserType] = useState<"student" | "teacher" | "parent" | null>(null);
  const [teacherHomeworks, setTeacherHomeworks] = useState<any[]>([]);
  const [teacherAssignments, setTeacherAssignments] = useState<any[]>([]);
  const [teacherMaterials, setTeacherMaterials] = useState<any[]>([]);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>("");

  const handleDownloadFile = () => {
    if (!selectedAssignment?.fileName || !selectedAssignment?.fileData) {
      alert('Файл олдсонгүй!');
      return;
    }
    
    try {
      // Create a link element
      const link = document.createElement('a');
      link.href = selectedAssignment.fileData;
      link.download = selectedAssignment.fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
    } catch (error) {
      alert('Файл татахад алдаа гарлаа!');
      console.error('Download error:', error);
    }
  };

  const handleDownloadMaterial = (material: any) => {
    if (!material?.fileName || !material?.fileData) {
      alert('Файл олдсонгүй!');
      return;
    }
    
    try {
      const link = document.createElement('a');
      link.href = material.fileData;
      link.download = material.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Файл татахад алдаа гарлаа!');
      console.error('Download error:', error);
    }
  };

  const handleOpenMaterialModal = (type: string) => {
    setSelectedMaterialType(type);
    setShowMaterialModal(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem("userType") as "student" | "teacher" | "parent" | null;
      setUserType(savedType);
      
      // Set user type if not set (default to student for course pages)
      if (!savedType && window.location.pathname.startsWith("/course/")) {
        localStorage.setItem("userType", "student");
        setUserType("student");
      }
      
      // Load teacher homeworks from localStorage (Бие даалт)
      const homeworks = JSON.parse(localStorage.getItem('teacherHomeworks') || '[]');
      const courseHomeworks = homeworks.filter((hw: any) => 
        hw.courseId === 'python-basics' || hw.courseId === null
      );
      setTeacherHomeworks(courseHomeworks);
      
      // Load teacher assignments from localStorage (Даалгавар)
      const assignments = JSON.parse(localStorage.getItem('teacherAssignments') || '[]');
      const courseAssignments = assignments.filter((assignment: any) => 
        assignment.courseId === 'python-basics' || assignment.courseId === null
      );
      setTeacherAssignments(courseAssignments);
      
      // Load teacher materials from localStorage
      const materials = JSON.parse(localStorage.getItem('teacherMaterials') || '[]');
      const courseMaterials = materials.filter((material: any) => 
        material.courseId === 'python-basics' || material.courseId === null
      );
      setTeacherMaterials(courseMaterials);
    }
  }, []);

  const weeks = [
    { id: 0, title: "Долоо хоног 1", description: "Python суулгах, орчин бэлтгэх", status: "Дууссан" },
    { id: 1, title: "Долоо хоног 2", description: "Өгөгдлийн төрлүүд, хувьсагч", status: "Дууссан" },
    { id: 2, title: "Долоо хоног 3", description: "Нөхцөл, операторууд", status: "Дууссан" },
    { id: 3, title: "Долоо хоног 4", description: "Давталт", status: "Дууссан" },
    { id: 4, title: "Долоо хоног 5", description: "Функц бичих", status: "Дууссан" },
    { id: 5, title: "Долоо хоног 6", description: "List, tuple, dictionary", status: "Дууссан" },
    { id: 6, title: "Долоо хоног 7", description: "Файл уншиж бичих", status: "Дууссан" },
    { id: 7, title: "Долоо хоног 8", description: "Дундын шалгалт", status: "Дууссан" },
    { id: 8, title: "Долоо хоног 9", description: "Exception handling", status: "Дууссан" },
    { id: 9, title: "Долоо хоног 10", description: "Module, package", status: "Дууссан" },
    { id: 10, title: "Долоо хоног 11", description: "OOP үндэс", status: "Дууссан" },
    { id: 11, title: "Долоо хоног 12", description: "Inheritance, polymorphism", status: "Дууссан" },
    { id: 12, title: "Долоо хоног 13", description: "Database холболт", status: "Дууссан" },
    { id: 13, title: "Долоо хоног 14", description: "Web scraping", status: "Явж буй" },
    { id: 14, title: "Долоо хоног 15", description: "Төслийн дадлага", status: "Дараагийн" },
    { id: 15, title: "Долоо хоног 16", description: "Эцсийн шалгалт", status: "Дараагийн" },
  ];

  const weekDetails = [
    {
      title: "Python суулгах, орчин бэлтгэх",
      topics: ["Python суулгах", "IDE сонгох", "Эхний програм"],
      resources: [
        { type: "📚", name: "Лекцийн слайд", href: "#" },
        { type: "🎬", name: "Видео хичээл", href: "#" },
        { type: "💻", name: "Жишээ код", href: "#" }
      ],
      tasks: [
        { name: "Даалгавар 1", deadline: "5 хоног", description: "Python суулгах заавар унших, тайлан бичих" }
      ],
      assignments: [
        { name: "Бие даалт 1", deadline: "3 хоног", description: "Python суулгаж, Hello World програм бичих" }
      ]
    },
    {
      title: "Өгөгдлийн төрлүүд, хувьсагч",
      topics: ["Өгөгдлийн төрлүүд", "Хувьсагч зарлах", "Төрөл хувиргалт"],
      resources: [
        { type: "📚", name: "Лекцийн слайд", href: "#" },
        { type: "🎬", name: "Видео хичээл", href: "#" },
        { type: "💻", name: "Жишээ код", href: "#" }
      ],
      tasks: [
        { name: "Даалгавар 2", deadline: "5 хоног", description: "Өгөгдлийн төрлүүдийн судалгаа хийх" },
        { name: "Даалгавар 3", deadline: "7 хоног", description: "Хувьсагчийн ашиглалтын жишээ бэлтгэх" }
      ],
      assignments: [
        { name: "Бие даалт 4", deadline: "3 хоног", description: "Өгөгдлийн төрлүүдийг ашиглан програм бичих" },
        { name: "Бие даалт 5", deadline: "5 хоног", description: "Хувьсагч зарлаж, төрөл хувиргалт хийх" },
        { name: "Бие даалт 6", deadline: "7 хоног", description: "Тооцоолуур програм бичих" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === "Дууссан") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
    if (status === "Явж буй") return "border-blue-400/20 bg-blue-500/10 text-blue-300";
    return "border-gray-400/20 bg-gray-500/10 text-gray-300";
  };

  return (
    <div className="min-h-screen font-sans text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main
          className="flex-1 overflow-y-auto bg-no-repeat px-4 py-5 md:px-6 md:py-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8, 14, 30, 0.75), rgba(8, 12, 24, 0.8)), url('/indra-bg.jpg')",
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            backgroundSize: "72%",
          }}
        >
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Course & Instructor Information */}
            <div className="grid gap-6 md:grid-cols-[70fr_30fr]">
              {/* Instructor Information */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Багшийн мэдээлэл</h2>
                <div className="grid gap-6 md:grid-cols-[216px_minmax(0,1fr)] md:items-center">
                  <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-blue-600 to-blue-800 p-3 md:h-52 md:w-52">
                    <span className="text-5xl font-semibold text-white">БГ</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Овог нэр</p>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">Б.Ганбат</div>
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Албан тушаал</p>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">Python програмчлалын багш</div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Имэйл</p>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                          📧 ganbat@indra.edu.mn
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Утас</p>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                          📱 +976 9999-9999
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md flex flex-col">
                <h2 className="text-sm font-medium uppercase tracking-[0.28em] text-white/70 mb-4">Хичээлийн тайлбар</h2>
                <div className="flex-1 flex items-center">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 w-full">
                    <p className="text-sm text-white/80 leading-relaxed text-center">
                      Энэхүү хичээл нь Python програмчлалын хэлийг суралцах анхны алхам бөгөөд үндсэн ойлголт, практик ур чадварыг эзэмшихэд чиглэгдсэн.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Overview */}
            <div className="rounded-[24px] border border-white/10 bg-[#081120]/70 p-6 backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Долоо хоногийн төлөвлөгөө</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">Харагдац:</span>
                  <select 
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white"
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                  >
                    {weeks.map((week) => (
                      <option key={week.id} value={week.id}>
                        {week.title}: {week.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2">
                  {weeks.map((week) => (
                    <button 
                      key={week.id}
                      onClick={() => setSelectedWeek(week.id)}
                      className={`flex shrink-0 flex-col items-center rounded-[16px] border p-3 transition-all ${selectedWeek === week.id ? 'border-violet-400/30 bg-violet-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      style={{ minWidth: '120px' }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                        <span className="text-sm font-medium text-white">{week.title}</span>
                      </div>
                      <span className="text-xs text-white/50">{week.description}</span>
                      <div className={`mt-2 rounded-full border px-2 py-0.5 text-xs ${getStatusColor(week.status)}`}>
                        {week.status}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Week Details */}
              <div className="rounded-[20px] border border-white/10 bg-white/5 p-6">
                <div className="mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">{weeks[selectedWeek].title}: {weeks[selectedWeek].description}</h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className={`rounded-full border px-3 py-1 text-sm ${getStatusColor(weeks[selectedWeek].status)}`}>
                        {weeks[selectedWeek].status}
                      </div>
                      <span className="text-sm text-white/50">{weekDetails[selectedWeek % 2]?.topics.length || 3} сэдэв</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-white/70">Сэдвүүд:</h4>
                    <div className="space-y-3">
                      {(weekDetails[selectedWeek % 2]?.topics || weekDetails[0].topics).map((topic, index) => (
                        <div key={index} className="flex items-start gap-3 rounded-[12px] border border-white/10 bg-white/5 p-3">
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-400/20">
                            <span className="text-xs text-white/60">{index + 1}</span>
                          </div>
                          <span className="text-sm text-white/80">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-white/70">Нөөц материал:</h4>
                    <div className="space-y-2">
                      {/* Static resources - clickable to open modal */}
                      <button
                        onClick={() => handleOpenMaterialModal('lecture')}
                        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70 hover:bg-white/10"
                      >
                        <span className="text-lg">📚</span>
                        Лекцийн слайд
                      </button>
                      <button
                        onClick={() => handleOpenMaterialModal('video')}
                        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70 hover:bg-white/10"
                      >
                        <span className="text-lg">🎬</span>
                        Видео хичээл
                      </button>
                      <button
                        onClick={() => handleOpenMaterialModal('code')}
                        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70 hover:bg-white/10"
                      >
                        <span className="text-lg">💻</span>
                        Жишээ код
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Даалгавар хэсэг */}
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-white/70">Даалгаврууд:</h4>
                    <div className="space-y-3">
                      {/* Static tasks from weekDetails */}
                      {(weekDetails[selectedWeek % 2]?.tasks || weekDetails[0].tasks || []).map((task, index) => (
                        <div key={`static-task-${index}`} className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <h4 className="mb-2 text-xs font-medium text-white/50">Даалгавар:</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{task.name}</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
                              {task.deadline}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-white/50">{task.description}</p>
                          <button className="mt-3 w-full rounded-lg border border-blue-400/30 bg-blue-500/15 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/25">
                            Даалгавар хийх
                          </button>
                        </div>
                      ))}
                      
                      {/* Dynamic assignments from teacher */}
                      {teacherAssignments
                        .filter((assignment) => assignment.weekNumber === selectedWeek + 1)
                        .map((assignment) => {
                        const dueDate = new Date(assignment.dueDate);
                        const now = new Date();
                        const daysLeft = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                        const deadlineText = daysLeft > 0 ? `${daysLeft} хоног` : 'Хугацаа дууссан';
                        const isOverdue = daysLeft < 0;
                        
                        return (
                          <div key={assignment.id} className={`rounded-lg border p-3 ${isOverdue ? 'border-red-400/20 bg-red-500/10' : 'border-blue-400/20 bg-blue-500/10'}`}>
                            <h4 className="mb-2 text-xs font-medium text-white/50">Даалгавар:</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{assignment.title}</span>
                                <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] text-blue-300">
                                  Багшаас
                                </span>
                              </div>
                              <span className={`rounded-full border px-2 py-0.5 text-xs ${isOverdue ? 'border-red-400/20 bg-red-500/10 text-red-300' : 'border-white/10 bg-white/5 text-white/50'}`}>
                                {deadlineText}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-white/50">{assignment.description || 'Дэлгэрэнгүй тайлбар байхгүй'}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
                              <span>📊 {assignment.points} оноо</span>
                              <span>•</span>
                              <span>👤 {assignment.type === 'individual' ? 'Хувь хүн' : assignment.type === 'group' ? 'Баг' : 'Хос'}</span>
                              {assignment.fileName && (
                                <>
                                  <span>•</span>
                                  <span>📎 Файл хавсаргасан</span>
                                </>
                              )}
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedAssignment({
                                  ...assignment,
                                  category: 'assignment',
                                  isStatic: false
                                });
                                setShowAssignmentModal(true);
                              }}
                              className={`mt-3 w-full rounded-lg border py-2 text-sm font-medium transition-colors ${isOverdue ? 'border-red-400/30 bg-red-500/15 text-red-200 hover:bg-red-500/25' : 'border-blue-400/30 bg-blue-500/15 text-blue-200 hover:bg-blue-500/25'}`}
                            >
                              {isOverdue ? 'Хугацаа дууссан' : 'Даалгавар хийх'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Бие даалт хэсэг */}
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-white/70">Бие даалтууд:</h4>
                    <div className="space-y-3">
                      {/* Static assignments from weekDetails */}
                      {(weekDetails[selectedWeek % 2]?.assignments || weekDetails[0].assignments).map((assignment, index) => (
                        <div key={`static-${index}`} className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <h4 className="mb-2 text-xs font-medium text-white/50">Бие даалт:</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{assignment.name}</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
                              {assignment.deadline}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-white/50">{assignment.description}</p>
                          <button className="mt-3 w-full rounded-lg border border-violet-400/30 bg-violet-500/15 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/25">
                            Даалгавар хийх
                          </button>
                        </div>
                      ))}
                      
                      {/* Dynamic homework from teacher */}
                      {teacherHomeworks
                        .filter((homework) => homework.weekNumber === selectedWeek + 1)
                        .map((homework) => {
                        const dueDate = new Date(homework.dueDate);
                        const now = new Date();
                        const daysLeft = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                        const deadlineText = daysLeft > 0 ? `${daysLeft} хоног` : 'Хугацаа дууссан';
                        const isOverdue = daysLeft < 0;
                        
                        return (
                          <div key={homework.id} className={`rounded-lg border p-3 ${isOverdue ? 'border-red-400/20 bg-red-500/10' : 'border-emerald-400/20 bg-emerald-500/10'}`}>
                            <h4 className="mb-2 text-xs font-medium text-white/50">Бие даалт:</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{homework.title}</span>
                                <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-300">
                                  Багшаас
                                </span>
                              </div>
                              <span className={`rounded-full border px-2 py-0.5 text-xs ${isOverdue ? 'border-red-400/20 bg-red-500/10 text-red-300' : 'border-white/10 bg-white/5 text-white/50'}`}>
                                {deadlineText}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-white/50">{homework.description || 'Дэлгэрэнгүй тайлбар байхгүй'}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
                              <span>📊 {homework.points} оноо</span>
                              <span>•</span>
                              <span>👤 {homework.type === 'individual' ? 'Хувь хүн' : homework.type === 'group' ? 'Баг' : 'Хос'}</span>
                              {homework.fileName && (
                                <>
                                  <span>•</span>
                                  <span>📎 Файл хавсаргасан</span>
                                </>
                              )}
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedAssignment({
                                  ...homework,
                                  category: 'homework',
                                  isStatic: false
                                });
                                setShowAssignmentModal(true);
                              }}
                              className={`mt-3 w-full rounded-lg border py-2 text-sm font-medium transition-colors ${isOverdue ? 'border-red-400/30 bg-red-500/15 text-red-200 hover:bg-red-500/25' : 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'}`}
                            >
                              {isOverdue ? 'Хугацаа дууссан' : 'Даалгавар хийх'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Assignment Detail Modal */}
      {showAssignmentModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-white/90">{selectedAssignment.title}</p>
                  {!selectedAssignment.isStatic && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${selectedAssignment.category === 'assignment' ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      Багшаас
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-white/40">
                  {selectedAssignment.category === 'assignment' ? 'Даалгавар' : 'Бие даалт'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAssignmentModal(false);
                  setSelectedAssignment(null);
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/40 hover:text-white/70"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Description */}
              {selectedAssignment.description && (
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                    Тайлбар
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                    {selectedAssignment.description}
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {selectedAssignment.dueDate && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Дуусах хугацаа
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                      📅 {new Date(selectedAssignment.dueDate).toLocaleString('mn-MN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}

                {selectedAssignment.points && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Оноо
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                      📊 {selectedAssignment.points} оноо
                    </div>
                  </div>
                )}

                {selectedAssignment.type && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Төрөл
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                      👤 {selectedAssignment.type === 'individual' ? 'Хувь хүн' : selectedAssignment.type === 'group' ? 'Баг' : 'Хос'}
                    </div>
                  </div>
                )}

                {selectedAssignment.weekNumber && (
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Долоо хоног
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                      📆 Долоо хоног {selectedAssignment.weekNumber}
                    </div>
                  </div>
                )}
              </div>

              {/* Attached File */}
              {selectedAssignment.fileName ? (
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                    Хавсаргасан файл
                  </label>
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{selectedAssignment.fileName}</p>
                        <p className="text-xs text-white/40">Багшаас хавсаргасан файл</p>
                      </div>
                      <button 
                        onClick={handleDownloadFile}
                        className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                      >
                        Татах
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                    Хавсаргасан файл
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/30">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/50">Файл хавсаргаагүй</p>
                        <p className="text-xs text-white/30">Багш файл хавсаргаагүй байна</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#0a1428] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {selectedMaterialType === 'lecture' ? '📚' : 
                     selectedMaterialType === 'video' ? '🎬' : '💻'}
                  </span>
                  <p className="text-lg font-semibold text-white/90">
                    {selectedMaterialType === 'lecture' ? 'Лекцийн слайд' : 
                     selectedMaterialType === 'video' ? 'Видео хичээл' : 'Жишээ код'}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-white/40">
                  Долоо хоног {selectedWeek + 1}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowMaterialModal(false);
                  setSelectedMaterialType("");
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/40 hover:text-white/70"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {teacherMaterials
                .filter((material) => 
                  material.weekNumber === selectedWeek + 1 && 
                  material.materialType === selectedMaterialType
                )
                .length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
                  <div className="mx-auto mb-3 h-16 w-16 rounded-full border-2 border-dashed border-white/10 bg-white/5 p-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white/30">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white/50">Материал байхгүй</p>
                  <p className="mt-1 text-xs text-white/30">Багш энэ долоо хоногт материал оруулаагүй байна</p>
                </div>
              ) : (
                teacherMaterials
                  .filter((material) => 
                    material.weekNumber === selectedWeek + 1 && 
                    material.materialType === selectedMaterialType
                  )
                  .map((material) => (
                    <div key={material.id} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-white">{material.title}</h3>
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                              Багшаас
                            </span>
                          </div>
                          {material.description && (
                            <p className="mt-1 text-sm text-white/60">{material.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{material.fileName}</p>
                          <p className="text-xs text-white/40">
                            {new Date(material.createdAt).toLocaleDateString('mn-MN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleDownloadMaterial(material)}
                          className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/25"
                        >
                          Татах
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
