// Product data with categories, details, and images
const products = [
  {
    id: 1,
    name: "CodeCraft IDE",
    category: "software",
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    description: "A powerful, intuitive code editor with advanced features for web developers. Includes syntax highlighting, real-time collaboration, and Git integration.",
    images: [
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Multi-language support with intelligent code completion",
      "Real-time collaborative editing with team members",
      "Integrated debugging tools and terminal",
      "Customizable interface with dark and light themes",
      "Built-in Git and GitHub integration",
      "Plugin ecosystem for unlimited extensibility"
    ],
    systemRequirements: {
      os: "Windows 10+, macOS 10.14+, Linux",
      processor: "Intel i5 or equivalent (2.4GHz+)",
      memory: "8GB RAM minimum, 16GB recommended",
      storage: "1GB available space",
      graphics: "DirectX 11 or OpenGL 3.3 compatible",
      additional: "Internet connection for updates and collaborative features"
    },
    downloadSize: "245MB",
    releaseDate: "2023-05-15",
    featured: true,
    bestSeller: true,
    new: false
  },
  {
    id: 2,
    name: "DesignStudio Pro",
    category: "software",
    price: 149.99,
    rating: 4.7,
    reviews: 98,
    description: "Professional design software for UI/UX designers. Create stunning interfaces, wireframes, and prototypes with an extensive component library.",
    images: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Vector-based design tools with non-destructive editing",
      "Prototyping with interactive components and transitions",
      "Design system management for consistent UI",
      "Responsive layout design for web and mobile",
      "Export options for all major platforms",
      "Cloud storage with version history"
    ],
    systemRequirements: {
      os: "Windows 10+, macOS 10.15+",
      processor: "Intel i7 or equivalent (3.0GHz+)",
      memory: "16GB RAM minimum",
      storage: "4GB available space, SSD recommended",
      graphics: "Dedicated GPU with 2GB VRAM",
      additional: "Pen tablet recommended for optimal experience"
    },
    downloadSize: "1.2GB",
    releaseDate: "2023-03-10",
    featured: true,
    bestSeller: false,
    new: false
  },
  {
    id: 3,
    name: "DataViz Analytics Suite",
    category: "software",
    price: 199.99,
    rating: 4.6,
    reviews: 75,
    description: "Transform complex data into insightful visualizations. Built for data scientists and analysts with AI-powered insights and advanced chart capabilities.",
    images: [
      "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Connect to multiple data sources including SQL, APIs, and CSV",
      "AI-powered data analysis and pattern recognition",
      "Interactive dashboard creation and sharing",
      "Real-time data monitoring and alerts",
      "40+ chart types with customizable options",
      "Export to PDF, PowerPoint, and interactive web pages"
    ],
    systemRequirements: {
      os: "Windows 10+, macOS 11+, Linux",
      processor: "Intel i7 or equivalent (3.2GHz+)",
      memory: "16GB RAM minimum, 32GB recommended",
      storage: "5GB available space, SSD required",
      graphics: "OpenGL 4.0 compatible",
      additional: "Internet connection required for cloud features"
    },
    downloadSize: "850MB",
    releaseDate: "2023-04-25",
    featured: false,
    bestSeller: true,
    new: false
  },
  {
    id: 4,
    name: "SoundForge Audio Editor",
    category: "software",
    price: 119.99,
    rating: 4.5,
    reviews: 62,
    description: "Professional audio editing software for musicians, podcasters, and sound engineers. Edit, mix, and master your audio projects with studio-quality effects.",
    images: [
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/6320/smartphone-vintage-technology-music.jpg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Multi-track recording and editing with unlimited layers",
      "Noise reduction and audio restoration tools",
      "Virtual instruments and MIDI support",
      "Professional mixing console with automation",
      "Library of 100+ audio effects and processors",
      "Industry-standard plugin support (VST, AU, AAX)"
    ],
    systemRequirements: {
      os: "Windows 10+, macOS 10.14+",
      processor: "Intel i5 or equivalent (2.5GHz+)",
      memory: "8GB RAM minimum, 16GB recommended",
      storage: "3GB available space",
      audio: "ASIO compatible audio interface recommended",
      additional: "MIDI controller recommended for virtual instruments"
    },
    downloadSize: "2.1GB",
    releaseDate: "2023-01-20",
    featured: false,
    bestSeller: false,
    new: false
  },
  {
    id: 5,
    name: "SecureVault Password Manager",
    category: "software",
    price: 49.99,
    rating: 4.9,
    reviews: 158,
    description: "Keep your digital life secure with military-grade encryption. Manage passwords, secure notes, and credit card information with ease across all your devices.",
    images: [
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "AES-256 encryption with zero-knowledge architecture",
      "Cross-platform synchronization (Windows, macOS, iOS, Android)",
      "Password generator and strength analyzer",
      "Two-factor authentication support",
      "Secure document storage and sharing",
      "Automatic form filling and autologin"
    ],
    systemRequirements: {
      os: "Windows 8+, macOS 10.13+, iOS 12+, Android 8+",
      processor: "1GHz or faster",
      memory: "2GB RAM",
      storage: "100MB available space",
      graphics: "Not applicable",
      additional: "Internet connection for synchronization"
    },
    downloadSize: "75MB",
    releaseDate: "2023-06-05",
    featured: true,
    bestSeller: true,
    new: true
  },
  {
    id: 6,
    name: "WebBuilder Studio",
    category: "software",
    price: 79.99,
    rating: 4.4,
    reviews: 47,
    description: "Create professional websites without coding. Drag-and-drop interface with responsive templates and integrated hosting solutions for small businesses and freelancers.",
    images: [
      "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "100+ responsive templates for various industries",
      "Drag-and-drop page builder with real-time preview",
      "E-commerce functionality with payment processing",
      "SEO tools and analytics integration",
      "Form builder with custom validation",
      "Domain registration and hosting packages included"
    ],
    systemRequirements: {
      os: "Windows 8+, macOS 10.12+",
      processor: "Intel i3 or equivalent (2.0GHz+)",
      memory: "4GB RAM minimum",
      storage: "500MB available space",
      graphics: "1280x768 screen resolution or higher",
      additional: "Broadband internet connection"
    },
    downloadSize: "325MB",
    releaseDate: "2022-12-10",
    featured: false,
    bestSeller: false,
    new: false
  },
  {
    id: 7,
    name: "Modern JavaScript: From Fundamentals to Frameworks",
    category: "ebooks",
    price: 29.99,
    rating: 4.8,
    reviews: 215,
    description: "Master JavaScript from the ground up. This comprehensive guide covers everything from basic syntax to advanced concepts like asynchronous programming and modern frameworks.",
    images: [
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/6701811/pexels-photo-6701811.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "550+ pages of practical JavaScript knowledge",
      "100+ code examples with detailed explanations",
      "Covers ES6+ features and modern best practices",
      "Real-world projects for hands-on learning",
      "Sections on React, Vue, and Angular frameworks",
      "Digital access on all devices with lifetime updates"
    ],
    pages: 558,
    format: "PDF, EPUB, MOBI",
    releaseDate: "2023-02-15",
    featured: true,
    bestSeller: true,
    new: false
  },
  {
    id: 8,
    name: "UX Design Principles: Creating Delightful User Experiences",
    category: "ebooks",
    price: 34.99,
    rating: 4.7,
    reviews: 128,
    description: "Learn the fundamentals of user-centered design. This practical guide takes you through the entire UX process with real-world case studies and actionable insights.",
    images: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Comprehensive guide to UX research methods",
      "User persona creation and journey mapping techniques",
      "Wireframing and prototyping best practices",
      "Usability testing and iteration frameworks",
      "Case studies from top technology companies",
      "Templates and resources for immediate application"
    ],
    pages: 425,
    format: "PDF, EPUB",
    releaseDate: "2023-01-10",
    featured: true,
    bestSeller: false,
    new: false
  },
  {
    id: 9,
    name: "Data Science for Beginners: Python Fundamentals",
    category: "ebooks",
    price: 24.99,
    rating: 4.6,
    reviews: 97,
    description: "Start your journey into data science with Python. Learn essential libraries like Pandas, NumPy, and Matplotlib while building practical data analysis projects.",
    images: [
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/11035481/pexels-photo-11035481.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "No prior programming experience required",
      "Step-by-step introduction to Python programming",
      "Data visualization and exploration techniques",
      "Statistical analysis and hypothesis testing",
      "10 hands-on projects with datasets included",
      "Code repository and additional online resources"
    ],
    pages: 380,
    format: "PDF, EPUB, MOBI",
    releaseDate: "2023-03-20",
    featured: false,
    bestSeller: true,
    new: false
  },
  {
    id: 10,
    name: "Cloud Architecture: Building Scalable Systems",
    category: "ebooks",
    price: 39.99,
    rating: 4.9,
    reviews: 76,
    description: "A comprehensive guide to designing and implementing cloud-based architectures. Learn best practices for AWS, Azure, and Google Cloud with real-world scenarios.",
    images: [
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Multi-cloud strategy development",
      "Microservices and serverless architectures",
      "Containerization with Docker and Kubernetes",
      "Security best practices for cloud deployment",
      "Cost optimization techniques",
      "Case studies of successful cloud migrations"
    ],
    pages: 490,
    format: "PDF, EPUB",
    releaseDate: "2023-05-05",
    featured: false,
    bestSeller: false,
    new: true
  },
  {
    id: 11,
    name: "Machine Learning Algorithms Explained",
    category: "ebooks",
    price: 32.99,
    rating: 4.5,
    reviews: 114,
    description: "Demystify machine learning algorithms with clear explanations and Python implementations. From linear regression to neural networks, understand the math and logic behind ML.",
    images: [
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2599245/pexels-photo-2599245.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Intuitive explanations of complex algorithms",
      "Visual representations of mathematical concepts",
      "Python code implementations for each algorithm",
      "Performance comparison and use case analysis",
      "Practical examples with real-world datasets",
      "Tips for hyperparameter tuning and optimization"
    ],
    pages: 420,
    format: "PDF, EPUB, MOBI",
    releaseDate: "2022-11-15",
    featured: true,
    bestSeller: false,
    new: false
  },
  {
    id: 12,
    name: "Cybersecurity Essentials: Protecting Digital Assets",
    category: "ebooks",
    price: 27.99,
    rating: 4.7,
    reviews: 89,
    description: "An essential guide to modern cybersecurity practices for individuals and organizations. Learn threat identification, risk management, and defensive strategies.",
    images: [
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    features: [
      "Comprehensive overview of cybersecurity landscape",
      "Threat modeling and risk assessment frameworks",
      "Network security and encryption fundamentals",
      "Social engineering defense tactics",
      "Incident response and recovery procedures",
      "Privacy regulations and compliance guidelines"
    ],
    pages: 360,
    format: "PDF, EPUB",
    releaseDate: "2023-04-10",
    featured: false,
    bestSeller: false,
    new: true
  }
];

// Function to get a product by ID
function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}

// Function to get related products (same category, excluding the current product)
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, limit);
}

// Function to get featured products
function getFeaturedProducts(limit = 4) {
  return products
    .filter(product => product.featured)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, limit);
}

// Function to get products by category
function getProductsByCategory(category, limit = null) {
  let result = products;
  
  if (category && category !== 'all') {
    result = result.filter(product => product.category === category);
  }
  
  if (limit) {
    result = result.slice(0, limit);
  }
  
  return result;
}

// Function to search products
function searchProducts(query) {
  if (!query) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
}

// Function to filter products by price
function filterProductsByPrice(maxPrice) {
  return products.filter(product => product.price <= maxPrice);
}

// Function to filter products by rating
function filterProductsByRating(minRating) {
  return products.filter(product => product.rating >= minRating);
}

// Function to sort products
function sortProducts(products, sortBy) {
  const productsCopy = [...products];
  
  switch(sortBy) {
    case 'price-low':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-high':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'rating':
      return productsCopy.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return productsCopy.filter(p => p.new).concat(productsCopy.filter(p => !p.new));
    case 'featured':
    default:
      return productsCopy.filter(p => p.featured).concat(productsCopy.filter(p => !p.featured));
  }
}