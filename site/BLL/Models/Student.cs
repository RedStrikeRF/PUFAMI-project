namespace PUFAMI_Project.BLL.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }

        public Student(int id, string email, string firstName, string lastName, string password)
        {
            Id = id;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
        }
    }
}
