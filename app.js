/**
 * Omnimed Medical Recruitment - Dynamic Application Engine (Saudi Arabia Complexes Edition)
 * Authors: Antigravity Team
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Navigation & Scroll Interactions
  // ==========================================
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Shrink navigation bar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu drawer toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Transform hamburger into cross
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile drawer on link selection
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navToggle.click();
      }
    });
  });

  // Highlight active nav links on viewport scroll
  function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================
  // 2. Viewport Animation Triggers
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-animate');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('animated');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Trigger animations on load
  setTimeout(handleScrollAnimation, 200);

  // ==========================================
  // 3. Stats Incremental Counter Animation
  // ==========================================
  const stats = [
    { id: 'stat-clinics', target: 180, suffix: '+' },
    { id: 'stat-match', target: 98, suffix: '%' },
    { id: 'stat-days', target: 5, suffix: ' Days' }
  ];

  let countersStarted = false;
  const statsSection = document.getElementById('hero-content');

  const countUp = () => {
    stats.forEach(stat => {
      const el = document.getElementById(stat.id);
      if (!el) return;
      
      let count = 0;
      const duration = 2000; // Animation duration in ms
      const increment = stat.target / (duration / 16); // 60 FPS
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= stat.target) {
          el.innerText = stat.target + stat.suffix;
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(count) + stat.suffix;
        }
      }, 16);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        countUp();
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 4. Dual Audience Portal Switches
  // ==========================================
  const toggleButtons = document.querySelectorAll('.portal-toggle-btn');
  const clientView = document.getElementById('portal-clients');
  const candidateView = document.getElementById('portal-candidates');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle active states
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-target');

      if (target === 'clients') {
        clientView.classList.add('active');
        candidateView.classList.remove('active');
      } else {
        candidateView.classList.add('active');
        clientView.classList.remove('active');
      }
    });
  });

  // ==========================================
  // 5. Job Board Filter & Render Engine (Saudi Complexes Edition)
  // ==========================================
  const placements = [
    {
      id: 1,
      title: "Plastic Surgeon (Cosmetic Specialist)",
      specialty: "surgery",
      specialtyLabel: "Surgery & Beauty",
      client: "Elite Cosmetic Surgery Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We are looking for a qualified plastic surgeon to join a private cosmetic medical complex in Riyadh. Must have experience in beauty and reconstructive surgeries."
    },
    {
      id: 2,
      title: "Dental Specialist (Orthodontist)",
      specialty: "dental",
      specialtyLabel: "Dental & Oral Health",
      client: "Prestige Dental Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Dentist",
      salary: "Determined after interview",
      description: "We are looking for a qualified Orthodontist to join our busy private dental complex in Riyadh. Must have experience in cosmetic and restorative dentistry."
    },
    {
      id: 3,
      title: "Radiologist (Diagnostic Doctor)",
      specialty: "radiology",
      specialtyLabel: "Radiology & Diagnostics",
      client: "Jeddah Medical Imaging Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We need a radiologist to work in a modern diagnostic complex in Jeddah. You will do MRI scans, read reports, and talk to patients."
    },
    {
      id: 4,
      title: "Locum Cardiologist (Heart Doctor)",
      specialty: "cardiology",
      specialtyLabel: "Cardiology & Heart Care",
      client: "Advanced Cardiac Complex",
      location: "Dammam, KSA",
      type: "locum",
      typeLabel: "Part-Time / Locum",
      salary: "Determined after interview",
      description: "We need a heart doctor for a short-term contract (locum) in a top medical complex in Dammam. Free luxury housing and travel provided."
    },
    {
      id: 5,
      title: "Surgery Nurse (Assistance Specialist)",
      specialty: "surgery",
      specialtyLabel: "Surgery & Beauty",
      client: "Prestige Day Surgery Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Nurse",
      salary: "Determined after interview",
      description: "We need a qualified surgery nurse to assist surgeons in a private medical complex in Riyadh. Clean, safe, and modern workplace."
    },
    {
      id: 6,
      title: "Children's Doctor (Pediatrician)",
      specialty: "pediatrics",
      specialtyLabel: "Pediatrics & Family Care",
      client: "Riyadh Family Medical Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We need an experienced children's doctor to manage general care and treatments in our family medical complex."
    },
    {
      id: 7,
      title: "Emergency Room Physician",
      specialty: "emergency",
      specialtyLabel: "Emergency & General Care",
      client: "Central Riyadh Care Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for a qualified emergency medicine doctor to lead our trauma and urgent care department."
    },
    {
      id: 8,
      title: "Women's Health Doctor (Obstetrician)",
      specialty: "obgyn",
      specialtyLabel: "Obstetrics & Gynecology",
      client: "Riyadh Women's Medical Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for an experienced doctor for women's health and maternity care."
    },
    {
      id: 9,
      title: "Skin Specialist (Dermatologist)",
      specialty: "derma",
      specialtyLabel: "Dermatology & Skin Care",
      client: "Jeddah Skin Beauty Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We need a skin specialist to join a modern aesthetic and skin care medical complex."
    },
    {
      id: 10,
      title: "Internal Medicine Doctor",
      specialty: "internal",
      specialtyLabel: "Internal Medicine",
      client: "Dammam Central Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for an internal medicine doctor to diagnose and treat adult diseases."
    },
    {
      id: 11,
      title: "Physical Therapist",
      specialty: "rehab",
      specialtyLabel: "Physiotherapy & Rehab",
      client: "Active Life Rehab Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Therapist",
      salary: "Determined after interview",
      description: "We need a physical therapist to help patients recover from injuries in our modern rehab center."
    },
    {
      id: 12,
      title: "Anesthesiologist",
      specialty: "anesthesia",
      specialtyLabel: "Anesthesia & Pain Care",
      client: "Elite Surgery Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for an anesthesiologist to provide pain management and anesthesia during procedures."
    },
    {
      id: 13,
      title: "Laboratory Technician",
      specialty: "lab",
      specialtyLabel: "Laboratory & Pathology",
      client: "Advanced Diagnostics Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Technician",
      salary: "Determined after interview",
      description: "We need a lab technician to run tests and manage lab equipment in our busy diagnostic center."
    },
    {
      id: 14,
      title: "Endodontist (Root Canal Specialist)",
      specialty: "dental",
      specialtyLabel: "Dental & Oral Health",
      client: "Prestige Dental Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Dentist",
      salary: "Determined after interview",
      description: "Looking for an experienced Endodontist for root canal treatments and advanced dental care."
    },
    {
      id: 15,
      title: "Pediatric Dentist",
      specialty: "dental",
      specialtyLabel: "Dental & Oral Health",
      client: "Family Smile Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Dentist",
      salary: "Determined after interview",
      description: "We need a pediatric dentist who is excellent with children to join our growing family dental clinic."
    },
    {
      id: 16,
      title: "Prosthodontist",
      specialty: "dental",
      specialtyLabel: "Dental & Oral Health",
      client: "Advanced Smile Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Dentist",
      salary: "Determined after interview",
      description: "Looking for a Prosthodontist specializing in dental implants, crowns, and restorative treatments."
    },
    {
      id: 17,
      title: "General & Cosmetic Dentist",
      specialty: "dental",
      specialtyLabel: "Dental & Oral Health",
      client: "Elite Cosmetic Surgery Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Dentist",
      salary: "Determined after interview",
      description: "We need a general and cosmetic dentist to provide routine care and aesthetic treatments."
    },
    {
      id: 18,
      title: "Consultant Ophthalmologist",
      specialty: "ophthalmology",
      specialtyLabel: "Ophthalmology & Eye Care",
      client: "Riyadh Eye Center",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for an eye surgeon experienced in laser vision correction and cataract surgeries."
    },
    {
      id: 19,
      title: "ENT Consultant",
      specialty: "ent",
      specialtyLabel: "ENT (Ear, Nose & Throat)",
      client: "Jeddah Specialist Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We are seeking a qualified ENT consultant to manage both clinical and surgical cases."
    },
    {
      id: 20,
      title: "Consultant Psychiatrist",
      specialty: "psychiatry",
      specialtyLabel: "Psychiatry & Mental Health",
      client: "Mind & Wellness Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Providing mental health evaluations and treatment plans in our modern psychological facility."
    },
    {
      id: 21,
      title: "Orthopedic Surgeon",
      specialty: "orthopedics",
      specialtyLabel: "Orthopedics & Bone Health",
      client: "Prestige Bone & Joint Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for a surgeon specialized in joint replacements and complex orthopedic trauma."
    },
    {
      id: 22,
      title: "Consultant Oncologist",
      specialty: "oncology",
      specialtyLabel: "Oncology & Cancer Care",
      client: "Riyadh Cancer Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We are seeking a consultant oncologist to manage chemotherapy and advanced cancer treatments."
    },
    {
      id: 23,
      title: "Neurologist",
      specialty: "neurology",
      specialtyLabel: "Neurology & Brain Health",
      client: "Advanced Brain Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for a neurologist to treat nervous system disorders and brain conditions."
    },
    {
      id: 24,
      title: "Gastroenterologist",
      specialty: "gastroenterology",
      specialtyLabel: "Gastroenterology & Digestive Health",
      client: "Digestive Health Center",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Seeking a specialist in digestive health and endoscopy procedures."
    },
    {
      id: 25,
      title: "Consultant Urologist",
      specialty: "urology",
      specialtyLabel: "Urology & Men's Health",
      client: "Elite Urology Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We need a consultant urologist for urinary tract treatments and men's health."
    },
    {
      id: 26,
      title: "Nephrologist",
      specialty: "nephrology",
      specialtyLabel: "Nephrology & Kidney Care",
      client: "Central Kidney Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for a kidney care specialist to manage dialysis and renal health."
    },
    {
      id: 27,
      title: "Pulmonologist",
      specialty: "pulmonology",
      specialtyLabel: "Pulmonology & Respiratory Care",
      client: "Respiratory Health Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Seeking a respiratory care doctor specializing in asthma, COPD, and lung health."
    },
    {
      id: 28,
      title: "ICU Specialist",
      specialty: "icu",
      specialtyLabel: "Intensive Care & ICU",
      client: "Critical Care Complex",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We are seeking a critical care specialist to manage our advanced ICU department."
    },
    {
      id: 29,
      title: "Geriatrician",
      specialty: "geriatrics",
      specialtyLabel: "Geriatrics & Elderly Care",
      client: "Senior Health Complex",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Looking for an elderly care specialist to manage chronic conditions in older adults."
    },
    {
      id: 30,
      title: "Plastic Surgeon",
      specialty: "plastic",
      specialtyLabel: "Plastic & Reconstructive Surgery",
      client: "Elite Aesthetics Center",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "We are looking for an experienced plastic surgeon for reconstructive and aesthetic procedures."
    },
    {
      id: 31,
      title: "Consultant Rheumatologist",
      specialty: "rheumatology",
      specialtyLabel: "Rheumatology & Autoimmune",
      client: "Advanced Joint Center",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Doctor",
      salary: "Determined after interview",
      description: "Seeking a specialist in joint diseases and autoimmune disorders."
    },
    {
      id: 32,
      title: "Clinical Dietitian",
      specialty: "nutrition",
      specialtyLabel: "Nutrition & Dietetics",
      client: "Wellness & Health Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Specialist",
      salary: "Determined after interview",
      description: "Looking for a licensed dietitian to create comprehensive meal plans for clinical patients."
    },
    {
      id: 33,
      title: "Clinical Pharmacist",
      specialty: "pharmacy",
      specialtyLabel: "Pharmacy & Clinical Pharmacology",
      client: "Central Hospital Pharmacy",
      location: "Riyadh, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Specialist",
      salary: "Determined after interview",
      description: "We are seeking a pharmacist to manage medication protocols in our inpatient wards."
    },
    {
      id: 34,
      title: "Speech & Language Therapist",
      specialty: "speech",
      specialtyLabel: "Speech & Language Therapy",
      client: "Rehabilitation & Speech Clinic",
      location: "Jeddah, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Specialist",
      salary: "Determined after interview",
      description: "Looking for a speech therapist to work with pediatric and adult patients on communication skills."
    },
    {
      id: 35,
      title: "Occupational Therapist",
      specialty: "occupational",
      specialtyLabel: "Occupational Therapy",
      client: "Physical Rehab Complex",
      location: "Dammam, KSA",
      type: "fulltime",
      typeLabel: "Full-Time Specialist",
      salary: "Determined after interview",
      description: "Seeking an occupational therapist to help patients recover daily living skills post-injury."
    }
  ];

  const jobCardsContainer = document.getElementById('job-cards-container');
  const noJobsFound = document.getElementById('no-jobs-found');
  
  // Filter input elements
  const searchTitleInput = document.getElementById('search-title');
  const searchSpecialtySelect = document.getElementById('search-specialty');
  const searchTypeSelect = document.getElementById('search-type');
  const btnReset = document.getElementById('btn-reset-filters');

  // Render Job Placements
  function renderJobs(jobsToRender) {
    if (!jobCardsContainer) return;
    
    jobCardsContainer.innerHTML = '';
    
    if (jobsToRender.length === 0) {
      jobCardsContainer.style.display = 'none';
      if (noJobsFound) noJobsFound.style.display = 'block';
      return;
    }

    jobCardsContainer.style.display = 'grid';
    if (noJobsFound) noJobsFound.style.display = 'none';

    jobsToRender.forEach(job => {
      const card = document.createElement('article');
      card.className = 'job-card glass-card scroll-animate animated';
      card.innerHTML = `
        <div class="job-card-header">
          <h3>${job.title}</h3>
          <span class="job-card-salary">${job.salary}</span>
        </div>
        <div class="job-card-client">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          ${job.location}
        </div>
        <p class="job-card-desc">${job.description}</p>
        <div class="job-card-footer">
          <div class="job-tags">
            <span class="job-tag specialty-tag">${job.specialtyLabel}</span>
            <span class="job-tag type-tag">${job.typeLabel}</span>
          </div>
          <button class="btn btn-primary btn-apply" data-job-id="${job.id}">Apply Now</button>
        </div>
      `;
      jobCardsContainer.appendChild(card);
    });

    // Attach click listeners to "Apply Now" buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const jobId = parseInt(button.getAttribute('data-job-id'));
        const job = placements.find(j => j.id === jobId);
        if (job) openApplyModal(job);
      });
    });
  }

  // Filter Engine Logic
  function filterJobs() {
    const searchTerm = searchTitleInput ? searchTitleInput.value.toLowerCase().trim() : '';
    const selectedSpecialty = searchSpecialtySelect ? searchSpecialtySelect.value : 'all';
    const selectedType = searchTypeSelect ? searchTypeSelect.value : 'all';

    const filtered = placements.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                            job.description.toLowerCase().includes(searchTerm) ||
                            job.client.toLowerCase().includes(searchTerm);
      
      const matchesSpecialty = selectedSpecialty === 'all' || job.specialty === selectedSpecialty;
      const matchesType = selectedType === 'all' || job.type === selectedType;

      return matchesSearch && matchesSpecialty && matchesType;
    });

    renderJobs(filtered);
  }

  // Input event listeners for live searching
  if (searchTitleInput) searchTitleInput.addEventListener('keyup', filterJobs);
  if (searchSpecialtySelect) searchSpecialtySelect.addEventListener('change', filterJobs);
  if (searchTypeSelect) searchTypeSelect.addEventListener('change', filterJobs);

  // Filter reset listener
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (searchTitleInput) searchTitleInput.value = '';
      if (searchSpecialtySelect) searchSpecialtySelect.value = 'all';
      if (searchTypeSelect) searchTypeSelect.value = 'all';
      renderJobs(placements);
    });
  }

  // Initial jobs rendering
  renderJobs(placements);

  // ==========================================
  // 6. Placement Application Modal Flow
  // ==========================================
  const applyModal = document.getElementById('apply-modal');
  const modalClose = document.getElementById('modal-close');
  const modalJobTitle = document.getElementById('modal-job-title');
  const modalJobClient = document.getElementById('modal-job-client');
  const modalJobSalary = document.getElementById('modal-job-salary');
  const applyForm = document.getElementById('apply-form');
  const fileDropzone = document.getElementById('file-dropzone');
  const applyCV = document.getElementById('apply-cv');
  const fileSelectedText = document.getElementById('file-selected-text');

  function openApplyModal(job) {
    if (!applyModal) return;
    
    modalJobTitle.innerText = `Apply: ${job.title}`;
    modalJobClient.innerText = job.client;
    modalJobSalary.innerText = job.salary;
    
    applyModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeApplyModal() {
    if (!applyModal) return;
    
    applyModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
    if (applyForm) applyForm.reset();
    if (fileSelectedText) {
      fileSelectedText.style.display = 'none';
      fileSelectedText.innerText = 'No file chosen';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeApplyModal);

  // Close when clicking modal backdrop
  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) {
        closeApplyModal();
      }
    });
  }

  // Keyboard accessibility: ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && applyModal && applyModal.classList.contains('active')) {
      closeApplyModal();
    }
  });

  // Dropzone file select visual sync
  if (applyCV && fileSelectedText) {
    applyCV.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        fileSelectedText.innerText = `File Selected: ${e.target.files[0].name}`;
        fileSelectedText.style.display = 'block';
      }
    });
  }

  // Modal application submission
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-application');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      // Capture inputs factually
      const applicantName = document.getElementById('apply-name').value;
      const applicantPhone = document.getElementById('apply-phone').value;
      const applicantEmail = document.getElementById('apply-email').value;
      
      console.log(`Intake registered: ${applicantName}, Phone: ${applicantPhone}, Email: ${applicantEmail}`);

      // Mock network submission delay
      setTimeout(() => {
        submitBtn.innerText = "Application Sent!";
        
        setTimeout(() => {
          closeApplyModal();
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
          alert("Your CV has been sent successfully. Our team will contact you soon.");
        }, 1000);
      }, 1500);
    });
  }

  // ==========================================
  // 7. Dynamic Adaptive Multi-Role Intake Form
  // ==========================================
  const formRoleBtns = document.querySelectorAll('.form-role-btn');
  const contactFormCard = document.getElementById('contact-form-card');
  const contactForm = document.getElementById('contact-form');
  const dynamicGroups = document.querySelectorAll('.form-dynamic-group');
  const formSuccessOverlay = document.getElementById('form-success-overlay');
  const successResetBtn = document.getElementById('btn-success-reset');
  const submitContactBtn = document.getElementById('btn-submit-contact');

  formRoleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedRole = btn.getAttribute('data-role');
      
      // Update form card active role attribute for styling
      contactFormCard.setAttribute('data-active-role', selectedRole);
      
      // Toggle button states
      formRoleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Adjust submit button label
      if (selectedRole === 'candidate' || selectedRole === 'nurse') {
        submitContactBtn.innerText = "Send CV Portfolio";
      } else {
        submitContactBtn.innerText = "Request Staff Consultation";
      }

      // Toggle dynamic fields (Employer specific vs Candidate specific)
      dynamicGroups.forEach(group => {
        if (group.getAttribute('data-group') === selectedRole) {
          group.classList.add('active');
          const input = group.querySelector('input, select');
          if (input) input.required = true;
        } else {
          group.classList.remove('active');
          const input = group.querySelector('input, select');
          if (input) {
            input.required = false;
            input.value = ''; // clear values on toggle
          }
        }
      });
    });
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitText = submitContactBtn.innerText;
      submitContactBtn.innerText = "Sending Message...";
      submitContactBtn.disabled = true;

      // Mock network submission delay
      setTimeout(() => {
        if (formSuccessOverlay) {
          formSuccessOverlay.style.display = 'flex';
        }
        submitContactBtn.disabled = false;
        submitContactBtn.innerText = submitText;
      }, 1500);
    });
  }

  // Return to intake form after success
  if (successResetBtn) {
    successResetBtn.addEventListener('click', () => {
      if (formSuccessOverlay) {
        formSuccessOverlay.style.display = 'none';
      }
      if (contactForm) {
        contactForm.reset();
      }
    });
  }

  // ==========================================
  // 8. Newsletter Subscription Submission
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const value = input.value;
      
      alert(`Subscription added for: ${value}. You will receive updates soon.`);
      input.value = '';
    });
  }
});
