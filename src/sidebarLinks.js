export default [
  {
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    path: '/dashboard'
  },
  {
    name: 'Usuários',
    icon: 'nc-icon nc-single-02',
    path: '/user'
  },
  {
    name: 'Cadastro',
    icon: 'nc-icon nc-simple-add',
    children: [
      {
        name: 'Especialidade',
        path: '/speciality'
      }
    ]
  }
]
