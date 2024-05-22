export  const columns = [
    {
      title: 'YEAR',
      dataIndex: 'work_year',
      key: 'work_year',
      sorter: (a, b) => a.work_year - b.work_year,
    },
    {
      title: 'SALARY(USD)',
      dataIndex: 'salary_in_usd',
      key: 'salary_in_usd',
      sorter: (a, b) => a.salary_in_usd - b.salary_in_usd,
    },
    {
      title: 'COMPANY SIZE',
      dataIndex: 'company_size',
      key: 'company_size',
      sorter: (a, b) => a.company_size.localeCompare(b.company_size),
    },
  ];