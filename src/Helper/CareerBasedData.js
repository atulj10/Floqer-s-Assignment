// getDataCareer.js
export const getDataCareer = ({ data, careerData, setCareerData }) => {
    const updatedData = careerData.map((item) => {
        let MLE = { avg_salary: 0, employee: 0 };
        let DA = { avg_salary: 0, employee: 0 };
        let RS = { avg_salary: 0, employee: 0 };
        let DE = { avg_salary: 0, employee: 0 };
        let DS = { avg_salary: 0, employee: 0 };

        data.forEach((i) => {
            if (i.work_year === item.year) {
                if (i.job_title === "Data Scientist") {
                    DS.avg_salary += i.salary_in_usd;
                    DS.employee++;
                } else if (i.job_title === "Data Engineer") {
                    DE.avg_salary += i.salary_in_usd;
                    DE.employee++;
                } else if (i.job_title === "Data Analyst") {
                    DA.avg_salary += i.salary_in_usd;
                    DA.employee++;
                } else if (i.job_title === "Machine Learning Engineer") {
                    MLE.avg_salary += i.salary_in_usd;
                    MLE.employee++;
                } else if (i.job_title === "Research Scientist") {
                    RS.avg_salary += i.salary_in_usd;
                    RS.employee++;
                }
            }
        });
        return {
            ...item,
            Machine_Learning_Engineer: MLE.employee,
            Data_Analyst: DA.employee,
            Data_Scientist: DS.employee,
            Data_Engineer: DE.employee,
            Research_Scientist: RS.employee,
        };
    });

    setCareerData(updatedData);
};
