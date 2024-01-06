using PUFAMI_Project.Data.Entities;
using PUFAMI_Project.Data.Interfaces;

namespace PUFAMI_Project.Data.Repositories
{
    public class StudentRepository : BaseRepository, IStudentRepository
    {
        public int Create(StudentEntity student)
        {
            return Execute(@"insert into students (firstname,lastname,password,email) values (:firstname,:lastname,:password,:email)", student);
        }

        public IEnumerable<StudentEntity> FindAll()
        {
            return Query<StudentEntity>("select * from students");
        }

        public StudentEntity FindByEmail(string email)
        {
            return QueryFirstOrDefault<StudentEntity>("select * from students where email = :user_email",
                new { user_email = email });
        }

        public StudentEntity FindById(int id)
        {
            return QueryFirstOrDefault<StudentEntity>("select * from students where id = :user_id",
                new { user_id = id });
        }

        public int Update(StudentEntity student)
        {
            return Execute(@"update users set email = :email, firstname = :firstname, 
                        lastname = :lastname, password = :password where id = :id", student);
        }
    }
}
