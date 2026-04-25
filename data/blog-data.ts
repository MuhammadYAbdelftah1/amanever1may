/**
 * Blog Data - Central Source of Truth
 * All blog posts, authors, and categories
 */

export type BlogCategory = 
  | 'صحة عامة'
  | 'تقنية صحية'
  | 'نصائح وقائية'
  | 'تغذية'
  | 'صحة نفسية'
  | 'أمومة وطفولة';

export interface BlogAuthor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  credentials: string[];
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full article content (Markdown or HTML)
  coverImage: string;
  coverImageType?: 'image' | 'video'; // New field to specify media type
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string;
  updatedDate?: string;
  readTimeMinutes: number;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// ============================================================================
// AUTHORS
// ============================================================================

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  'dr-khaled': {
    id: 'dr-khaled',
    name: 'د. خالد السقاف',
    title: 'استشاري أمراض القلب',
    bio: 'استشاري أمراض القلب والأوعية الدموية مع خبرة تزيد عن 15 عاماً في المستشفيات السعودية. حاصل على البورد السعودي والزمالة الأمريكية.',
    avatar: '/images/authors/dr-khaled.jpg', // TODO: Add real image
    credentials: [
      'البورد السعودي في أمراض القلب',
      'الزمالة الأمريكية (FACC)',
      'عضو الجمعية السعودية لأمراض القلب',
    ],
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  'dr-hind': {
    id: 'dr-hind',
    name: 'د. هند الغامدي',
    title: 'استشارية التغذية العلاجية',
    bio: 'استشارية تغذية علاجية معتمدة من الهيئة السعودية للتخصصات الصحية. متخصصة في التغذية الوقائية وإدارة الأمراض المزمنة.',
    avatar: '/images/authors/dr-hind.jpg', // TODO: Add real image
    credentials: [
      'ماجستير التغذية العلاجية',
      'عضو الجمعية السعودية للتغذية',
      'مستشارة معتمدة من SCFHS',
    ],
  },
  'aman-team': {
    id: 'aman-team',
    name: 'فريق أمان إيفر',
    title: 'فريق المحتوى الطبي',
    bio: 'فريق متخصص من الأطباء والكتّاب الطبيين المعتمدين، نعمل على تقديم محتوى صحي موثوق ومبسّط للجمهور السعودي.',
    avatar: '/images/logo.png',
    credentials: [
      'محتوى مراجع من أطباء معتمدين',
      'مصادر علمية موثوقة',
    ],
  },
  'dr-sara': {
    id: 'dr-sara',
    name: 'د. سارة المطيري',
    title: 'استشارية الصحة النفسية',
    bio: 'استشارية نفسية إكلينيكية مع خبرة 10 سنوات في علاج الاضطرابات النفسية والإرشاد الأسري.',
    avatar: '/images/authors/dr-sara.jpg', // TODO: Add real image
    credentials: [
      'دكتوراه علم النفس الإكلينيكي',
      'عضو الجمعية السعودية للطب النفسي',
    ],
  },
};

// ============================================================================
// BLOG POSTS
// ============================================================================

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'periodic-checkups-guide',
    title: 'أهمية الفحوصات الدورية: دليلك للكشف المبكر عن الأمراض',
    excerpt: 'تعرف على الفحوصات الأساسية الموصى بها حسب العمر والجنس، وكيف يمكن للكشف المبكر أن ينقذ حياتك من أمراض خطيرة.',
    content: `
# أهمية الفحوصات الدورية: دليلك للكشف المبكر عن الأمراض

الفحوصات الدورية هي أحد أهم الإجراءات الوقائية التي يمكن أن تنقذ حياتك. في هذا المقال، سنستعرض أهم الفحوصات الموصى بها حسب العمر والجنس.

## لماذا الفحوصات الدورية مهمة؟

الكشف المبكر عن الأمراض يزيد من فرص العلاج الناجح بنسبة تصل إلى 90% في بعض الحالات. العديد من الأمراض الخطيرة مثل السكري، ارتفاع ضغط الدم، وأمراض القلب لا تظهر أعراضاً واضحة في مراحلها الأولى.

## الفحوصات الأساسية حسب العمر

### من 20-30 سنة
- فحص ضغط الدم (سنوياً)
- فحص الكوليسترول (كل 5 سنوات)
- فحص السكري (إذا كان هناك تاريخ عائلي)
- فحص الغدة الدرقية (للنساء)

### من 30-40 سنة
- جميع الفحوصات السابقة
- فحص القلب (ECG)
- فحص الكبد والكلى
- فحص فيتامين D

### من 40-50 سنة
- جميع الفحوصات السابقة
- فحص السرطان (حسب الجنس)
- فحص العظام (للنساء)
- فحص البروستاتا (للرجال)

### فوق 50 سنة
- فحص شامل سنوي
- فحص القلب والأوعية الدموية
- فحص السرطان الدوري
- فحص النظر والسمع

## نصائح مهمة

1. **لا تنتظر الأعراض**: الوقاية خير من العلاج
2. **احتفظ بسجل طبي**: دوّن نتائج فحوصاتك
3. **استشر طبيبك**: ناقش نتائجك مع طبيب مختص
4. **اتبع التوصيات**: التزم بالفحوصات الدورية

## كيف يساعدك أمان إيفر؟

مع أمان إيفر، يمكنك:
- حجز الفحوصات الدورية بخصومات تصل إلى 70%
- الحصول على استشارة طبية فورية لمناقشة النتائج
- تذكيرات تلقائية بمواعيد الفحوصات

**تذكر:** الفحوصات الدورية استثمار في صحتك المستقبلية. لا تؤجل فحصك السنوي!

---

*هذا المقال مراجع طبياً من قبل د. خالد السقاف، استشاري أمراض القلب.*
    `,
    coverImage: '/images/blog/periodic-checkups-cover.jpeg',
    category: 'صحة عامة',
    tags: ['فحوصات', 'وقاية', 'كشف مبكر', 'صحة'],
    author: BLOG_AUTHORS['dr-khaled'],
    publishedDate: '2026-04-20',
    readTimeMinutes: 5,
    featured: true,
    seo: {
      metaTitle: 'أهمية الفحوصات الدورية: دليلك للكشف المبكر | أمان إيفر',
      metaDescription: 'دليل شامل للفحوصات الطبية الدورية حسب العمر والجنس. تعرف على أهمية الكشف المبكر وكيف يمكن أن ينقذ حياتك.',
      keywords: ['فحوصات دورية', 'كشف مبكر', 'فحص طبي', 'وقاية', 'صحة'],
    },
  },
  {
    id: '2',
    slug: 'digital-health-vision-2030',
    title: 'التحول الرقمي الصحي في المملكة 2030: أين نحن الآن؟',
    excerpt: 'كيف تساهم التقنيات الحديثة ومنصات مثل أمان إيفر في تحقيق أهداف رؤية 2030 في قطاع الرعاية الصحية.',
    content: `
# التحول الرقمي الصحي في المملكة 2030

تشهد المملكة العربية السعودية تحولاً رقمياً غير مسبوق في قطاع الرعاية الصحية، بما يتماشى مع رؤية 2030.

## أهداف التحول الرقمي الصحي

1. **تحسين جودة الخدمات الصحية**
2. **زيادة كفاءة النظام الصحي**
3. **تسهيل الوصول للرعاية الطبية**
4. **خفض التكاليف الصحية**

## التقنيات المستخدمة

### الاستشارات عن بُعد (Telemedicine)
أصبح بإمكان المرضى الحصول على استشارات طبية من منازلهم، مما يوفر الوقت والجهد.

### السجلات الطبية الإلكترونية
توحيد السجلات الطبية يسهل على الأطباء الوصول لتاريخك الطبي الكامل.

### الذكاء الاصطناعي
استخدام AI في التشخيص المبكر وتحليل الصور الطبية.

## دور أمان إيفر

نحن في أمان إيفر نساهم في هذا التحول من خلال:
- منصة رقمية متكاملة للرعاية الصحية
- استشارات طبية فورية عن بُعد
- شبكة واسعة من مقدمي الخدمات الصحية
- خصومات وباقات ميسرة للجميع

## المستقبل

نتطلع لمستقبل تكون فيه الرعاية الصحية:
- متاحة للجميع
- عالية الجودة
- ميسرة التكلفة
- رقمية بالكامل

---

*مقال من فريق أمان إيفر - بالتعاون مع خبراء التحول الرقمي*
    `,
    coverImage: '/images/blog/vision-2030-digital-health.png',
    category: 'تقنية صحية',
    tags: ['رؤية 2030', 'تحول رقمي', 'تقنية', 'صحة رقمية'],
    author: BLOG_AUTHORS['aman-team'],
    publishedDate: '2026-04-15',
    readTimeMinutes: 7,
    featured: true,
    seo: {
      metaTitle: 'التحول الرقمي الصحي في السعودية 2030 | أمان إيفر',
      metaDescription: 'تعرف على التحول الرقمي في قطاع الصحة السعودي ودور التقنية في تحقيق أهداف رؤية 2030.',
      keywords: ['رؤية 2030', 'تحول رقمي', 'صحة رقمية', 'تقنية صحية', 'السعودية'],
    },
  },
  {
    id: '3',
    slug: '5-heart-healthy-habits',
    title: '5 عادات يومية تحمي قلبك من أمراض الأوعية الدموية',
    excerpt: 'عادات بسيطة وعلمية موصى بها من جمعية القلب الأمريكية، يمكنك تطبيقها اليوم لحماية صحة قلبك على المدى الطويل.',
    content: `
# 5 عادات يومية تحمي قلبك

أمراض القلب هي السبب الأول للوفاة عالمياً. لكن الخبر السار أن 80% من أمراض القلب يمكن الوقاية منها من خلال تغيير نمط الحياة.

## العادة الأولى: المشي 30 دقيقة يومياً

المشي السريع لمدة 30 دقيقة يومياً يقلل من خطر الإصابة بأمراض القلب بنسبة 35%.

**نصائح للبدء:**
- ابدأ بـ 10 دقائق وزد تدريجياً
- اختر وقتاً ثابتاً يومياً
- استخدم تطبيقات تتبع الخطوات

## العادة الثانية: تناول حفنة من المكسرات

المكسرات غنية بالأوميغا 3 والدهون الصحية التي تحمي القلب.

**الكمية الموصى بها:**
- 30 جرام يومياً (حفنة صغيرة)
- اللوز والجوز الأفضل
- تجنب المكسرات المملحة

## العادة الثالثة: النوم 7-8 ساعات

قلة النوم ترفع ضغط الدم وتزيد خطر أمراض القلب.

**نصائح لنوم أفضل:**
- نم واستيقظ في نفس الوقت
- تجنب الشاشات قبل النوم بساعة
- اجعل غرفتك مظلمة وباردة

## العادة الرابعة: تقليل الملح

الملح الزائد يرفع ضغط الدم ويجهد القلب.

**كيف تقلل الملح:**
- لا تضع الملاحة على الطاولة
- اقرأ ملصقات الأطعمة
- استخدم التوابل بدلاً من الملح

## العادة الخامسة: إدارة التوتر

التوتر المزمن يضر بالقلب بشكل مباشر.

**تقنيات بسيطة:**
- تمارين التنفس العميق
- التأمل 10 دقائق يومياً
- قضاء وقت مع الأحباب

## الخلاصة

صحة قلبك في يديك. ابدأ بعادة واحدة اليوم، وأضف عادة جديدة كل أسبوع.

**استشر طبيبك:** إذا كان لديك تاريخ عائلي بأمراض القلب، احجز فحصاً دورياً.

---

*مراجع طبياً من د. خالد السقاف، استشاري أمراض القلب*
    `,
    coverImage: '/images/blog/heart-healthy-habits.jpeg',
    category: 'نصائح وقائية',
    tags: ['قلب', 'وقاية', 'عادات صحية', 'نمط حياة'],
    author: BLOG_AUTHORS['dr-khaled'],
    publishedDate: '2026-04-10',
    readTimeMinutes: 4,
    featured: false,
    seo: {
      metaTitle: '5 عادات يومية تحمي قلبك من الأمراض | أمان إيفر',
      metaDescription: 'عادات بسيطة وعلمية لحماية قلبك من أمراض الأوعية الدموية. نصائح من استشاري أمراض القلب.',
      keywords: ['صحة القلب', 'عادات صحية', 'وقاية', 'أمراض القلب', 'نمط حياة صحي'],
    },
  },
  // TODO: Add more articles (target: 10-15 articles)
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all blog posts
 */
export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return BLOG_POSTS
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS
    .filter(post => post.category === category)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

/**
 * Get related posts (same category, exclude current)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return BLOG_POSTS
    .filter(post => 
      post.slug !== currentSlug && 
      post.category === currentPost.category
    )
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}

/**
 * Get all categories with post count
 */
export function getAllCategories(): Array<{ name: BlogCategory; count: number }> {
  const categories: BlogCategory[] = [
    'صحة عامة',
    'تقنية صحية',
    'نصائح وقائية',
    'تغذية',
    'صحة نفسية',
    'أمومة وطفولة',
  ];

  return categories.map(category => ({
    name: category,
    count: BLOG_POSTS.filter(post => post.category === category).length,
  })).filter(cat => cat.count > 0);
}

/**
 * Search posts by title or excerpt
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
