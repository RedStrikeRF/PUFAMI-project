namespace PUFAMI_Project.BLL.Models
{
    public class User
    {
        public int avatar { get; set; }
        public string password { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string role { get; set; }
        public string email { get; set; }

        public User(string avatar, string password, string surname, string name, string role, string email)
        {
            this.avatar = int.Parse(avatar);
            this.password = password;
            this.surname = surname;
            this.name = name;
            this.role = role;
            this.email = email;
        }
    }
}
