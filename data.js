// محتوى الموقع: الدروس المشتركة + بيانات كل لغة
// ملاحظة: الأكواد مكتوبة بـ String.raw عشان الـ backslash يفضل زي ما هو.
const r = String.raw;

const TOPICS = [
  { id: "hello", title: "أول برنامج (Hello World)", text: "أول خطوة في أي لغة: اطبع جملة على الشاشة. ده بيأكد إن الأدوات عندك شغالة وإنك فاهم الشكل الأساسي لأي برنامج." },
  { id: "vars", title: "المتغيرات وأنواع البيانات", text: "المتغير هو صندوق بنخزن فيه قيمة (نص، رقم، صح/غلط) ونديله اسم عشان نرجعله بعدين." },
  { id: "cond", title: "الشروط (if / else)", text: "الشروط بتخلي البرنامج ياخد قرار: لو الشرط صح ينفذ كود، ولو غلط ينفذ كود تاني." },
  { id: "loops", title: "التكرار (Loops)", text: "بدل ما تكتب نفس السطر ١٠٠ مرة، الحلقات (for / while) بتكرر الكود لحد ما شرط معين يتحقق." },
  { id: "funcs", title: "الدوال (Functions)", text: "الدالة كود مترتب باسم، بنكتبه مرة ونستدعيه كام مرة نحتاجه، وممكن ياخد مدخلات ويرجع نتيجة." },
  { id: "lists", title: "القوائم والمجموعات", text: "لما عندك كذا قيمة من نفس النوع (أسماء، أرقام) بتخزنها في قائمة (Array / List) وتلف عليها." },
  { id: "oop", title: "الكلاسات والكائنات (OOP)", text: "الكلاس قالب بيجمع البيانات والدوال المرتبطة ببعض، والكائن (Object) نسخة منه. ده أساس البرمجة الكائنية." },
];

const LANGS = [
  {
    id: "python", name: "Python", color: "#3776ab", ext: ".py",
    tagline: "أسهل لغة للبداية، وبتتستخدم في الذكاء الاصطناعي وتحليل البيانات.",
    about: "Python لغة بسيطة وقريبة من الإنجليزي، بتعتمد على المسافات البادئة (Indentation) بدل الأقواس. مناسبة جداً للمبتدئين.",
    uses: ["الذكاء الاصطناعي", "تحليل البيانات", "الأتمتة (Automation)", "تطوير الويب (Django / Flask)"],
    run: "python main.py",
    code: {
      hello: r`print("Hello, World!")`,
      vars: r`name = "Ali"        # string
age = 20            # int
height = 1.75       # float
is_student = True   # bool

print(f"{name} is {age} years old")`,
      cond: r`score = 85

if score >= 90:
    print("Excellent")
elif score >= 60:
    print("Pass")
else:
    print("Try again")`,
      loops: r`for i in range(1, 6):
    print(i)

n = 3
while n > 0:
    print("countdown", n)
    n -= 1`,
      funcs: r`def add(a, b):
    return a + b

print(add(2, 3))   # 5`,
      lists: r`fruits = ["apple", "banana", "mango"]
fruits.append("orange")

for f in fruits:
    print(f)

squares = [x * x for x in range(1, 6)]
print(squares)`,
      oop: r`class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Hi, I'm " + self.name)

p = Person("Sara")
p.greet()`,
    },
    quiz: [
      { q: "إيه الدالة اللي بتطبع نص على الشاشة في Python؟", o: ["echo()", "print()", "console.log()", "printf()"], a: 1 },
      { q: "Python بتحدد الـ block بإيه؟", o: ["الأقواس { }", "begin / end", "المسافات البادئة (Indentation)", "الفاصلة المنقوطة ;"], a: 2 },
      { q: "إزاي بنضيف عنصر لآخر القائمة؟", o: ["list.add(x)", "list.append(x)", "list.push(x)", "list.insert_end(x)"], a: 1 },
    ],
  },
  {
    id: "javascript", name: "JavaScript", color: "#f0db4f", ext: ".js",
    tagline: "لغة الويب: بتخلي المواقع تتحرك وتتفاعل.",
    about: "JavaScript بتشتغل في المتصفح وعلى السيرفر (Node.js). أي موقع تفاعلي بتشوفه غالباً بيستخدمها.",
    uses: ["صفحات الويب التفاعلية", "السيرفرات (Node.js)", "تطبيقات الموبايل (React Native)", "الألعاب البسيطة"],
    run: "node main.js",
    code: {
      hello: r`console.log("Hello, World!");`,
      vars: r`const name = "Ali";   // can't be reassigned
let age = 20;          // can change
let isStudent = true;

console.log(name + " is " + age + " years old");`,
      cond: r`const score = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Try again");
}`,
      loops: r`for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let n = 3;
while (n > 0) {
  console.log("countdown", n);
  n--;
}`,
      funcs: r`function add(a, b) {
  return a + b;
}

const mul = (a, b) => a * b;   // arrow function

console.log(add(2, 3), mul(2, 3));`,
      lists: r`const fruits = ["apple", "banana", "mango"];
fruits.push("orange");

for (const f of fruits) {
  console.log(f);
}

const squares = [1, 2, 3, 4, 5].map(x => x * x);
console.log(squares);`,
      oop: r`class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hi, I'm " + this.name);
  }
}

const p = new Person("Sara");
p.greet();`,
    },
    quiz: [
      { q: "إزاي بنعرف متغير ثابت مش هيتغير؟", o: ["var x", "let x", "const x", "static x"], a: 2 },
      { q: "إيه اللي بيطبع في الـ console؟", o: ["print()", "console.log()", "echo", "System.out.println()"], a: 1 },
      { q: "الـ map() بتعمل إيه على المصفوفة؟", o: ["بتمسح عناصر", "بتطبق دالة على كل عنصر وترجع مصفوفة جديدة", "بتعمل sort", "بتجمع الأرقام بس"], a: 1 },
    ],
  },
  {
    id: "typescript", name: "TypeScript", color: "#3178c6", ext: ".ts",
    tagline: "JavaScript بس بأنواع بيانات (Types) تمنع كتير من الأخطاء.",
    about: "TypeScript بتتحول (Compile) لـ JavaScript. الميزة إنها بتكتشف الأخطاء وإنت بتكتب الكود قبل ما يشتغل.",
    uses: ["مشاريع الويب الكبيرة", "Angular / React / Vue", "Node.js APIs"],
    run: "npx tsx main.ts",
    code: {
      hello: r`console.log("Hello, World!");`,
      vars: r`const name: string = "Ali";
let age: number = 20;
let isStudent: boolean = true;

console.log(name + " is " + age + " years old");`,
      cond: r`const score: number = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Try again");
}`,
      loops: r`for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let n: number = 3;
while (n > 0) {
  console.log("countdown", n);
  n--;
}`,
      funcs: r`function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
// add("2", 3);  // compile error!`,
      lists: r`const fruits: string[] = ["apple", "banana", "mango"];
fruits.push("orange");

for (const f of fruits) {
  console.log(f);
}`,
      oop: r`interface Greeter {
  greet(): void;
}

class Person implements Greeter {
  constructor(private name: string) {}

  greet(): void {
    console.log("Hi, I'm " + this.name);
  }
}

new Person("Sara").greet();`,
    },
    quiz: [
      { q: "TypeScript بتضيف لـ JavaScript إيه؟", o: ["سرعة أعلى", "أنواع بيانات ثابتة (Static Types)", "واجهة رسومية", "قواعد بيانات"], a: 1 },
      { q: "إزاي بنعرف متغير نصي؟", o: ["let x: string", "let x = string", "string x", "x: text"], a: 0 },
      { q: "الكود بيتنفذ في المتصفح بعد ما بيتحول لـ؟", o: ["Python", "JavaScript", "Java", "C"], a: 1 },
    ],
  },
  {
    id: "java", name: "Java", color: "#e76f00", ext: ".java",
    tagline: "لغة الشركات وتطبيقات الأندرويد القديمة، قوية ومستقرة.",
    about: "Java لغة كائنية صارمة بتشتغل على أي جهاز عليه JVM (اكتب مرة وشغل في أي مكان).",
    uses: ["أنظمة البنوك والشركات", "Spring Boot", "تطبيقات الأندرويد", "الأنظمة الكبيرة"],
    run: "javac Main.java && java Main",
    code: {
      hello: r`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      vars: r`public class Main {
    public static void main(String[] args) {
        String name = "Ali";
        int age = 20;
        double height = 1.75;
        boolean isStudent = true;

        System.out.println(name + " is " + age + " years old");
    }
}`,
      cond: r`public class Main {
    public static void main(String[] args) {
        int score = 85;

        if (score >= 90) {
            System.out.println("Excellent");
        } else if (score >= 60) {
            System.out.println("Pass");
        } else {
            System.out.println("Try again");
        }
    }
}`,
      loops: r`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }

        int n = 3;
        while (n > 0) {
            System.out.println("countdown " + n);
            n--;
        }
    }
}`,
      funcs: r`public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));
    }
}`,
      lists: r`import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("apple");
        fruits.add("banana");
        fruits.add("mango");

        for (String f : fruits) {
            System.out.println(f);
        }
    }
}`,
      oop: r`class Person {
    private String name;

    Person(String name) {
        this.name = name;
    }

    void greet() {
        System.out.println("Hi, I'm " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("Sara");
        p.greet();
    }
}`,
    },
    quiz: [
      { q: "نقطة بداية أي برنامج Java هي؟", o: ["start()", "main()", "public static void main(String[] args)", "run()"], a: 2 },
      { q: "إيه الفرق بين int و double؟", o: ["مفيش فرق", "int للأعداد الصحيحة و double للكسور", "int للنصوص", "double للصح/غلط"], a: 1 },
      { q: "الـ JVM وظيفتها؟", o: ["تنسيق الكود", "تشغيل الـ bytecode على أي جهاز", "إدارة قواعد البيانات", "رسم الواجهات"], a: 1 },
    ],
  },
  {
    id: "c", name: "C", color: "#5c6bc0", ext: ".c",
    tagline: "أم اللغات: سريعة جداً وبتقربك من الجهاز.",
    about: "C بتديك تحكم كامل في الذاكرة. بتعلمك إزاي الكمبيوتر بيشتغل فعلاً، وبتتستخدم في أنظمة التشغيل والأنظمة المدمجة.",
    uses: ["أنظمة التشغيل", "الأنظمة المدمجة (Embedded)", "برامج عالية الأداء", "تعلم أساسيات الذاكرة"],
    run: "gcc main.c -o main && ./main",
    code: {
      hello: r`#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}`,
      vars: r`#include <stdio.h>

int main(void) {
    int age = 20;
    float height = 1.75f;
    char grade = 'A';

    printf("Age: %d, Height: %.2f, Grade: %c\n", age, height, grade);
    return 0;
}`,
      cond: r`#include <stdio.h>

int main(void) {
    int score = 85;

    if (score >= 90) {
        printf("Excellent\n");
    } else if (score >= 60) {
        printf("Pass\n");
    } else {
        printf("Try again\n");
    }
    return 0;
}`,
      loops: r`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\n", i);
    }

    int n = 3;
    while (n > 0) {
        printf("countdown %d\n", n);
        n--;
    }
    return 0;
}`,
      funcs: r`#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    printf("%d\n", add(2, 3));
    return 0;
}`,
      lists: r`#include <stdio.h>

int main(void) {
    int nums[5] = {10, 20, 30, 40, 50};

    for (int i = 0; i < 5; i++) {
        printf("%d\n", nums[i]);
    }
    return 0;
}`,
      oop: r`#include <stdio.h>

/* C has no classes, but struct groups data */
struct Person {
    char name[20];
    int age;
};

int main(void) {
    struct Person p = {"Sara", 22};
    printf("%s is %d\n", p.name, p.age);
    return 0;
}`,
    },
    quiz: [
      { q: "إيه الدالة اللي بتطبع في C؟", o: ["print()", "cout", "printf()", "echo"], a: 2 },
      { q: "C فيها كلاسات (Classes)؟", o: ["أيوه زي Java", "لأ، فيها struct بدلها", "أيوه بس اختيارية", "لأ ومفيش حاجة شبهها"], a: 1 },
      { q: "الأمر #include <stdio.h> بيعمل إيه؟", o: ["بيعرف متغير", "بيضيف مكتبة الإدخال والإخراج", "بيشغل البرنامج", "بيمسح الذاكرة"], a: 1 },
    ],
  },
  {
    id: "cpp", name: "C++", color: "#00599c", ext: ".cpp",
    tagline: "C + برمجة كائنية: الاختيار الأول للألعاب والأداء العالي.",
    about: "C++ امتداد لـ C وبتضيف الكلاسات والمكتبة القياسية (STL). بتتستخدم في محركات الألعاب والبرامج الثقيلة.",
    uses: ["الألعاب (Unreal Engine)", "البرامج عالية الأداء", "المسابقات البرمجية", "الأنظمة المدمجة"],
    run: "g++ main.cpp -o main && ./main",
    code: {
      hello: r`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
      vars: r`#include <iostream>
#include <string>

int main() {
    std::string name = "Ali";
    int age = 20;
    double height = 1.75;
    bool isStudent = true;

    std::cout << name << " is " << age << " years old" << std::endl;
    return 0;
}`,
      cond: r`#include <iostream>

int main() {
    int score = 85;

    if (score >= 90) {
        std::cout << "Excellent" << std::endl;
    } else if (score >= 60) {
        std::cout << "Pass" << std::endl;
    } else {
        std::cout << "Try again" << std::endl;
    }
    return 0;
}`,
      loops: r`#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        std::cout << i << std::endl;
    }

    int n = 3;
    while (n > 0) {
        std::cout << "countdown " << n << std::endl;
        n--;
    }
    return 0;
}`,
      funcs: r`#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3) << std::endl;
    return 0;
}`,
      lists: r`#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> fruits = {"apple", "banana", "mango"};
    fruits.push_back("orange");

    for (const auto& f : fruits) {
        std::cout << f << std::endl;
    }
    return 0;
}`,
      oop: r`#include <iostream>
#include <string>

class Person {
public:
    Person(std::string name) : name(name) {}

    void greet() {
        std::cout << "Hi, I'm " << name << std::endl;
    }

private:
    std::string name;
};

int main() {
    Person p("Sara");
    p.greet();
    return 0;
}`,
    },
    quiz: [
      { q: "إزاي بنطبع في C++؟", o: ["printf فقط", "std::cout << ...", "print()", "System.out"], a: 1 },
      { q: "std::vector هو؟", o: ["نوع نص", "مصفوفة ديناميكية بتكبر وتصغر", "دالة رياضية", "كلاس للملفات"], a: 1 },
      { q: "إيه اللي C++ بتضيفه على C؟", o: ["مفيش جديد", "الكلاسات والبرمجة الكائنية", "الـ garbage collector", "الأقواس بس"], a: 1 },
    ],
  },
  {
    id: "csharp", name: "C#", color: "#68217a", ext: ".cs",
    tagline: "لغة مايكروسوفت: ألعاب Unity وتطبيقات الويب والديسكتوب.",
    about: "C# لغة حديثة وقوية وشبه Java لكن بمميزات أكتر. بتتستخدم مع .NET وUnity.",
    uses: ["ألعاب Unity", "تطبيقات ASP.NET", "برامج ويندوز", "الـ APIs"],
    run: "dotnet run",
    code: {
      hello: r`using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
      vars: r`using System;

class Program
{
    static void Main()
    {
        string name = "Ali";
        int age = 20;
        double height = 1.75;
        bool isStudent = true;

        Console.WriteLine(name + " is " + age + " years old");
    }
}`,
      cond: r`using System;

class Program
{
    static void Main()
    {
        int score = 85;

        if (score >= 90)
            Console.WriteLine("Excellent");
        else if (score >= 60)
            Console.WriteLine("Pass");
        else
            Console.WriteLine("Try again");
    }
}`,
      loops: r`using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 5; i++)
            Console.WriteLine(i);

        int n = 3;
        while (n > 0)
        {
            Console.WriteLine("countdown " + n);
            n--;
        }
    }
}`,
      funcs: r`using System;

class Program
{
    static int Add(int a, int b)
    {
        return a + b;
    }

    static void Main()
    {
        Console.WriteLine(Add(2, 3));
    }
}`,
      lists: r`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> fruits = new List<string> { "apple", "banana", "mango" };
        fruits.Add("orange");

        foreach (string f in fruits)
            Console.WriteLine(f);
    }
}`,
      oop: r`using System;

class Person
{
    private string name;

    public Person(string name)
    {
        this.name = name;
    }

    public void Greet()
    {
        Console.WriteLine("Hi, I'm " + name);
    }
}

class Program
{
    static void Main()
    {
        Person p = new Person("Sara");
        p.Greet();
    }
}`,
    },
    quiz: [
      { q: "إزاي بنطبع في C#؟", o: ["print()", "Console.WriteLine()", "echo", "puts"], a: 1 },
      { q: "C# بتتستخدم كتير مع محرك الألعاب؟", o: ["Unreal", "Unity", "Godot فقط", "Phaser"], a: 1 },
      { q: "الـ foreach بتستخدم لـ؟", o: ["اللف على عناصر مجموعة", "تعريف دالة", "الشروط", "الاتصال بالإنترنت"], a: 0 },
    ],
  },
  {
    id: "go", name: "Go", color: "#00add8", ext: ".go",
    tagline: "لغة جوجل: بسيطة وسريعة وممتازة للسيرفرات.",
    about: "Go (أو Golang) صممت عشان تكون سهلة وسريعة في الـ compile ومعاها دعم قوي للتزامن (Concurrency).",
    uses: ["الـ Backend والـ APIs", "Docker / Kubernetes", "أدوات سطر الأوامر", "الأنظمة الموزعة"],
    run: "go run main.go",
    code: {
      hello: r`package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
      vars: r`package main

import "fmt"

func main() {
    var name string = "Ali"
    age := 20            // type inferred
    height := 1.75
    isStudent := true

    fmt.Println(name, "is", age, "years old", height, isStudent)
}`,
      cond: r`package main

import "fmt"

func main() {
    score := 85

    if score >= 90 {
        fmt.Println("Excellent")
    } else if score >= 60 {
        fmt.Println("Pass")
    } else {
        fmt.Println("Try again")
    }
}`,
      loops: r`package main

import "fmt"

func main() {
    // Go has only one loop keyword: for
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
    }

    n := 3
    for n > 0 {
        fmt.Println("countdown", n)
        n--
    }
}`,
      funcs: r`package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    fmt.Println(add(2, 3))
}`,
      lists: r`package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana", "mango"}
    fruits = append(fruits, "orange")

    for _, f := range fruits {
        fmt.Println(f)
    }
}`,
      oop: r`package main

import "fmt"

// Go uses structs + methods instead of classes
type Person struct {
    Name string
}

func (p Person) Greet() {
    fmt.Println("Hi, I'm", p.Name)
}

func main() {
    p := Person{Name: "Sara"}
    p.Greet()
}`,
    },
    quiz: [
      { q: "الـ := في Go بتعمل إيه؟", o: ["مقارنة", "تعريف متغير مع استنتاج النوع", "تعليق", "استدعاء دالة"], a: 1 },
      { q: "كام keyword للحلقات في Go؟", o: ["٣ (for, while, do)", "٢", "واحد بس: for", "٤"], a: 2 },
      { q: "Go مشهورة بإيه؟", o: ["الرسومات", "التزامن (Goroutines) والسرعة", "الذكاء الاصطناعي", "الألعاب"], a: 1 },
    ],
  },
  {
    id: "rust", name: "Rust", color: "#b7410e", ext: ".rs",
    tagline: "سرعة C++ مع أمان في الذاكرة بدون garbage collector.",
    about: "Rust بتمنع أخطاء الذاكرة وقت الـ compile عن طريق نظام الملكية (Ownership). منحناها أصعب شوية لكن النتيجة كود آمن وسريع.",
    uses: ["أنظمة آمنة وسريعة", "WebAssembly", "أدوات سطر الأوامر", "الأنظمة المدمجة"],
    run: "cargo run",
    code: {
      hello: r`fn main() {
    println!("Hello, World!");
}`,
      vars: r`fn main() {
    let name = "Ali";         // immutable by default
    let mut age = 20;         // mut = can change
    age += 1;
    let height: f64 = 1.75;
    let is_student = true;

    println!("{} is {} years old", name, age);
    println!("{} {}", height, is_student);
}`,
      cond: r`fn main() {
    let score = 85;

    if score >= 90 {
        println!("Excellent");
    } else if score >= 60 {
        println!("Pass");
    } else {
        println!("Try again");
    }
}`,
      loops: r`fn main() {
    for i in 1..=5 {
        println!("{}", i);
    }

    let mut n = 3;
    while n > 0 {
        println!("countdown {}", n);
        n -= 1;
    }
}`,
      funcs: r`fn add(a: i32, b: i32) -> i32 {
    a + b      // no semicolon = returned value
}

fn main() {
    println!("{}", add(2, 3));
}`,
      lists: r`fn main() {
    let mut fruits = vec!["apple", "banana", "mango"];
    fruits.push("orange");

    for f in &fruits {
        println!("{}", f);
    }
}`,
      oop: r`struct Person {
    name: String,
}

impl Person {
    fn greet(&self) {
        println!("Hi, I'm {}", self.name);
    }
}

fn main() {
    let p = Person { name: String::from("Sara") };
    p.greet();
}`,
    },
    quiz: [
      { q: "المتغيرات في Rust بتكون افتراضياً؟", o: ["قابلة للتغيير", "ثابتة (immutable)", "global", "نصوص"], a: 1 },
      { q: "الكلمة اللي بتخلي المتغير قابل للتغيير؟", o: ["var", "let", "mut", "change"], a: 2 },
      { q: "Rust بتمنع أخطاء الذاكرة بـ؟", o: ["Garbage Collector", "نظام الملكية (Ownership)", "المترجم الخارجي", "الـ runtime"], a: 1 },
    ],
  },
  {
    id: "php", name: "PHP", color: "#777bb3", ext: ".php",
    tagline: "لغة السيرفر اللي شغالة ملايين المواقع (WordPress, Laravel).",
    about: "PHP متخصصة في الـ Backend وبتتكتب جوه ملفات بتبدأ بـ <?php. سهلة النشر وعليها استضافات رخيصة كتير.",
    uses: ["WordPress", "Laravel", "المتاجر الإلكترونية", "الـ APIs"],
    run: "php main.php",
    code: {
      hello: r`<?php
echo "Hello, World!";`,
      vars: r`<?php
$name = "Ali";       // variables start with $
$age = 20;
$height = 1.75;
$isStudent = true;

echo $name . " is " . $age . " years old";`,
      cond: r`<?php
$score = 85;

if ($score >= 90) {
    echo "Excellent";
} elseif ($score >= 60) {
    echo "Pass";
} else {
    echo "Try again";
}`,
      loops: r`<?php
for ($i = 1; $i <= 5; $i++) {
    echo $i . "\n";
}

$n = 3;
while ($n > 0) {
    echo "countdown " . $n . "\n";
    $n--;
}`,
      funcs: r`<?php
function add($a, $b) {
    return $a + $b;
}

echo add(2, 3);`,
      lists: r`<?php
$fruits = ["apple", "banana", "mango"];
$fruits[] = "orange";

foreach ($fruits as $f) {
    echo $f . "\n";
}

$user = ["name" => "Ali", "age" => 20];   // associative array
echo $user["name"];`,
      oop: r`<?php
class Person {
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function greet() {
        echo "Hi, I'm " . $this->name;
    }
}

$p = new Person("Sara");
$p->greet();`,
    },
    quiz: [
      { q: "المتغيرات في PHP بتبدأ بـ؟", o: ["#", "$", "@", "&"], a: 1 },
      { q: "إزاي بنطبع نص؟", o: ["print_text", "echo", "cout", "console.log"], a: 1 },
      { q: "الدمج بين النصوص في PHP بيتم بـ؟", o: ["+", ".", "&", ","], a: 1 },
    ],
  },
  {
    id: "kotlin", name: "Kotlin", color: "#7f52ff", ext: ".kt",
    tagline: "اللغة الرسمية لتطبيقات الأندرويد: مختصرة وآمنة.",
    about: "Kotlin بتشتغل على JVM وبتحل مشاكل Java المزعجة (زي الـ null). جوجل بتفضلها لتطوير الأندرويد.",
    uses: ["تطبيقات الأندرويد", "الـ Backend (Ktor / Spring)", "Kotlin Multiplatform"],
    run: "kotlinc main.kt -include-runtime -d main.jar && java -jar main.jar",
    code: {
      hello: r`fun main() {
    println("Hello, World!")
}`,
      vars: r`fun main() {
    val name = "Ali"      // val = read-only
    var age = 20          // var = can change
    age += 1
    val height: Double = 1.75

    println("$name is $age years old")
}`,
      cond: r`fun main() {
    val score = 85

    if (score >= 90) {
        println("Excellent")
    } else if (score >= 60) {
        println("Pass")
    } else {
        println("Try again")
    }

    // when is a powerful switch
    val grade = when {
        score >= 90 -> "A"
        score >= 60 -> "B"
        else -> "C"
    }
    println(grade)
}`,
      loops: r`fun main() {
    for (i in 1..5) {
        println(i)
    }

    var n = 3
    while (n > 0) {
        println("countdown $n")
        n--
    }
}`,
      funcs: r`fun add(a: Int, b: Int): Int {
    return a + b
}

fun mul(a: Int, b: Int) = a * b   // single expression

fun main() {
    println(add(2, 3))
    println(mul(2, 3))
}`,
      lists: r`fun main() {
    val fruits = mutableListOf("apple", "banana", "mango")
    fruits.add("orange")

    for (f in fruits) {
        println(f)
    }

    val squares = (1..5).map { it * it }
    println(squares)
}`,
      oop: r`class Person(private val name: String) {
    fun greet() {
        println("Hi, I'm $name")
    }
}

fun main() {
    val p = Person("Sara")
    p.greet()
}`,
    },
    quiz: [
      { q: "الفرق بين val و var في Kotlin؟", o: ["مفيش فرق", "val ثابت و var قابل للتغيير", "val للنصوص", "var ثابت"], a: 1 },
      { q: "Kotlin هي اللغة المفضلة لتطوير؟", o: ["الويندوز", "الأندرويد", "الألعاب فقط", "الـ iOS فقط"], a: 1 },
      { q: "إزاي بندخل متغير جوه نص؟", o: ["\"$name\"", "\"#name\"", "\"{name}\"", "\"%name\""], a: 0 },
    ],
  },
  {
    id: "swift", name: "Swift", color: "#fa7343", ext: ".swift",
    tagline: "لغة أبل لتطبيقات iPhone وMac: حديثة وسريعة.",
    about: "Swift لغة آمنة وواضحة بتستخدمها أبل لتطوير تطبيقات iOS وmacOS وwatchOS.",
    uses: ["تطبيقات iPhone / iPad", "تطبيقات Mac", "SwiftUI", "Server-side Swift"],
    run: "swift main.swift",
    code: {
      hello: r`print("Hello, World!")`,
      vars: r`let name = "Ali"        // constant
var age = 20             // variable
age += 1
let height: Double = 1.75

print("\(name) is \(age) years old")`,
      cond: r`let score = 85

if score >= 90 {
    print("Excellent")
} else if score >= 60 {
    print("Pass")
} else {
    print("Try again")
}`,
      loops: r`for i in 1...5 {
    print(i)
}

var n = 3
while n > 0 {
    print("countdown \(n)")
    n -= 1
}`,
      funcs: r`func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

print(add(2, 3))`,
      lists: r`var fruits = ["apple", "banana", "mango"]
fruits.append("orange")

for f in fruits {
    print(f)
}

let squares = [1, 2, 3, 4, 5].map { $0 * $0 }
print(squares)`,
      oop: r`class Person {
    let name: String

    init(name: String) {
        self.name = name
    }

    func greet() {
        print("Hi, I'm \(name)")
    }
}

let p = Person(name: "Sara")
p.greet()`,
    },
    quiz: [
      { q: "Swift من تطوير؟", o: ["جوجل", "مايكروسوفت", "أبل", "ميتا"], a: 2 },
      { q: "الكلمة اللي بتعرف ثابت في Swift؟", o: ["const", "let", "val", "final"], a: 1 },
      { q: "إزاي بندخل متغير في نص؟", o: ["\\(name)", "$name", "{name}", "%name"], a: 0 },
    ],
  },
];
