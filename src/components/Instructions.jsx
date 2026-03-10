import { useAuth } from "./authcontext";

function About() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-2xl mx-auto px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">שלום {user ? user.email : ""}</h1>
      <h2 className="text-2xl mb-6">הוראות</h2>
      <p className="text-lg leading-relaxed bg-white/40 p-6 rounded-xl border border-black/5 shadow-sm text-right">
        <p>רק טבעת אחת יכולה להיות באוויר. </p>
        <p>מותר להניח טבעת רק על טבעת גדולה ממנה.</p>
        <p>צריך לסדר את כל הטבעות בעמודה אחת, ואז עולים רמה ונוספת עוד טבעת.</p>
        העיקרון פשוט, החכמה לעשות את זה כמה שיותר מהר. שימו לב: במחשבים מומלץ
        להשתמש במקשי 1,2,3 על מנת לשלוט בעמודות במהירות!
      </p>
    </div>
  );
}

export default About;
