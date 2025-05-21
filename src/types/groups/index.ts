type Group = {
  id: number;
  groupName: string;
  course: string;
  teacher: string;
  lessonDays: string;
  lessonTime: string;
  studentCount: number;
  startDate: string; 
  endDate: string;   
  status: 'active' | 'completed' | 'pending';
};
