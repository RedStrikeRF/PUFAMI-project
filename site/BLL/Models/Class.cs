namespace PUFAMI_Project.BLL.Models
{
    public class Class
    {
        public Dictionary<int, School> Schools { get; set; }

        public Class(Dictionary<int, School> schools)
        {
            Schools = schools;
        }
    }

    public class School
    {
        public string Name { get; set; }
        public string Graduate { get; set; }
        public string Owner { get; set; }
        public Dictionary<string, Subject> Structure { get; set; }

        public School(string name, string graduate, string owner, Dictionary<string, Subject> structure)
        {
            Name = name;
            Graduate = graduate;
            Owner = owner;
            Structure = structure;
        }
    }

    public class Subject
    {
        public string Name { get; set; }
        public int Grade { get; set; }

        public Subject(string name, int grade)
        {
            Name = name;
            Grade = grade;
        }
    }
}
