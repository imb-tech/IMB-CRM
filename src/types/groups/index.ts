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

type GroupExam = {
  id: number
  name: string
  take_date: string
  min_score: number
  max_score: number
}