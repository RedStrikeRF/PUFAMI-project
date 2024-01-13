using PUFAMI_Project.BLL.Exceptions;
using PUFAMI_Project.BLL.Models;
using PUFAMI_Project.Data.Entities;
using PUFAMI_Project.Data.Interfaces;
using PUFAMI_Project.Data.Repositories;

namespace PUFAMI_Project.BLL.Services
{
    public class StudentService
    {
        IStudentRepository studentRepository;

        public StudentService()
        {
            studentRepository = new StudentRepository();
        }

        public void Register(StudentRegistrationData registrationData)
        {
            if (registrationData.Password.Length < 8)
                throw new ArgumentNullException("Пароль должен содержать не меньше 8 символов");

            if (studentRepository.FindByEmail(registrationData.Email) != null)
                throw new ArgumentNullException();

            var userEntity = new StudentEntity()
            {
                email = registrationData.Email,
                firstname = registrationData.FirstName,
                lastname = registrationData.LastName,
                password = registrationData.Password
            };

            if (this.studentRepository.Create(userEntity) == 0)
                throw new Exception();
        }

        public Student Authenticate(StudentAuthenticationData userAuthenticationData)
        {
            var findStudentEntity = studentRepository.FindByEmail(userAuthenticationData.Email);
            if (findStudentEntity is null)
                throw new UserNotFoundException();

            if (findStudentEntity.password != userAuthenticationData.Password)
                throw new WrongPasswordException();

            return ConstructStudentModel(findStudentEntity);
        }

        public Student FindByEmail(string email)
        {
            var findStudentEntity = studentRepository.FindByEmail(email);
            if (findStudentEntity is null)
                throw new UserNotFoundException();

            return ConstructStudentModel(findStudentEntity);
        }

        public void Update(Student student)
        {
            var updatableStudentEntity = new StudentEntity()
            {
                id = student.Id,
                email = student.Email,
                firstname = student.FirstName,
                lastname = student.LastName,
                password = student.Password,
            };

            if (this.studentRepository.Update(updatableStudentEntity) == 0)
                throw new Exception();
        }

        public Student FindById(int id)
        {
            var findStudentEntity = studentRepository.FindById(id);
            if (findStudentEntity is null) throw new UserNotFoundException();

            return ConstructStudentModel(findStudentEntity);
        }

        private Student ConstructStudentModel(StudentEntity studentEntity)
        {
            return new Student(studentEntity.id,
                            studentEntity.firstname,
                            studentEntity.lastname,
                            studentEntity.password,
                            studentEntity.email);
        }
    }
}
