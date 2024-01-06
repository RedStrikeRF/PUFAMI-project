using PUFAMI_Project.Data.Entities;

namespace PUFAMI_Project.Data.Interfaces
{
    public interface IStudentRepository
    {
        int Create(StudentEntity student);
        StudentEntity FindByEmail(string email);
        IEnumerable<StudentEntity> FindAll();
        StudentEntity FindById(int id);
        int Update(StudentEntity student);
    }
}
