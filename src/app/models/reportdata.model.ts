export interface ReportData {
    projectReports: {
      [key: string]: {
        projectName: string;
        activities: {
          [key: string]: {
            activityName: string;
            timeSpent: number;
          };
        };
        totalTimeSpent: number;
      };
    };
  }