namespace PUFAMI_Project.BLL.Models
{
    public class Class
    {
        public string name { get; set; }
        public string graduate { get; set; }
        public string owner { get; set; }
        public Dictionary<string, List<Subject>> structure { get; set; }

        public Class(string name, string graduate, string owner, Dictionary<string, List<Subject>> structure)
        {
            this.name = name;
            this.graduate = graduate;
            this.owner = owner;
            this.structure = structure;
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
