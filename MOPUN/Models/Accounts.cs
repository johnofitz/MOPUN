using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace MOPUN.Models
{
    /// <summary>
    /// Class model used to access user info set in database
    /// Contains privilages as to distungish page access between User,
    /// Watch keeper and Administrator
    /// </summary>
    public class Accounts
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required, NotNull]
        [Display(Name = "Username")]
        public string? Username { get; set; }

        [Required, NotNull]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string? Password { get; set; }

        //[Required, NotNull]
        public string? Privilege { get; set; }
    }
}
