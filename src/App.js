import React, { useEffect } from 'react';
import './App.css';
import Waypoint from 'waypoints/lib/noframework.waypoints';
import Swiper from 'swiper';
import Isotope from 'isotope-layout';
import ReactDOM from "react-dom";
import ProgressBar from "./components/ProgressBar";

function App() {

  useEffect(() => {
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    const scrollto = (el) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const toggleMobileNav = () => {
      const navbar = select('#navbar');
      if (navbar) {
        navbar.classList.toggle('navbar-mobile');
      }
      const mobileNavToggle = select('.mobile-nav-toggle');
      if (mobileNavToggle) {
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
      }
    };

    const handleNavlinkClick = (e) => {
      e.preventDefault();

      const sectionId = e.target.getAttribute('href');
      const section = select(sectionId);
      if (section) {
        const navbar = select('#navbar');
        const header = select('#header');
        const navlinks = select('#navbar .nav-link', true);
        const sections = select('section', true);

        navlinks.forEach((item) => {
          item.classList.remove('active');
        });

        e.target.classList.add('active');

        if (navbar.classList.contains('navbar-mobile')) {
          toggleMobileNav();
        }

        if (sectionId === '#header') {
          header.classList.remove('header-top');
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          return;
        }

        if (!header.classList.contains('header-top')) {
          header.classList.add('header-top');
          setTimeout(() => {
            sections.forEach((item) => {
              item.classList.remove('section-show');
            });
            section.classList.add('section-show');
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }

        scrollto(sectionId);
      }
    };

    const handleHashLoad = () => {
      if (window.location.hash) {
        const initialNav = select(window.location.hash);
        if (initialNav) {
          const header = select('#header');
          const navlinks = select('#navbar .nav-link', true);

          header.classList.add('header-top');

          navlinks.forEach((item) => {
            if (item.getAttribute('href') === window.location.hash) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });

          setTimeout(() => {
            initialNav.classList.add('section-show');
          }, 350);

          scrollto(window.location.hash);
        }
      }
    };

    document.querySelectorAll('#navbar .nav-link').forEach((link) => {
      link.addEventListener('click', handleNavlinkClick);
    });
    document.querySelector('.mobile-nav-toggle').addEventListener('click', toggleMobileNav);
    window.addEventListener('load', handleHashLoad);

    return () => {
      // Cleanup event listeners
      document.querySelectorAll('#navbar .nav-link').forEach((link) => {
        link.removeEventListener('click', handleNavlinkClick);
      });
      document.querySelector('.mobile-nav-toggle').removeEventListener('click', toggleMobileNav);
      window.removeEventListener('load', handleHashLoad);
    };
  }, []);

  useEffect(() => {
    // Testimonials slider initialization
    const handleSwiper = () => {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      });
    }

    // Portfolio isotope and filter
    const handlePortfolioIsotope = () => {
      const portfolioContainer = document.querySelector('.portfolio-container');
      if (portfolioContainer) {
        const portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

        portfolioFilters.forEach((filter) => {
          filter.addEventListener('click', (e) => {
            e.preventDefault();
            portfolioFilters.forEach((el) => {
              el.classList.remove('filter-active');
            });
            filter.classList.add('filter-active');

            portfolioIsotope.arrange({
              filter: filter.getAttribute('data-filter')
            });
          });
        });
      }
    };

    // Initialize functions on component mount
    handlePortfolioIsotope();
    handleSwiper();
    // Cleanup event listeners on component unmount
    return () => {
      // Waypoint.destroyAll();
      // Cleanup Swiper instance if necessary
      // Cleanup Isotope instance if necessary
    };
  }, []);


  return (
    <div className="App">
      <div className="intro-overlay"></div>
      <header id="header">
        <div className="container">
          <h5>Hello, World.</h5>
          <h1><a href="index.html">I'm Vlad H</a></h1>
          <p className="intro-position">
            <span>FullStack</span>
            <span>MERN</span>
            <span>Python</span>
            <span>AI / ChatGPT</span>
            <span>AI Automation</span>
            <span>Bot</span>
          </p>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="nav-link active" href="#header">Home</a></li>
              <li><a className="nav-link" href="#about">About</a></li>
              <li><a className="nav-link" href="#resume">Resume</a></li>
              {/* <li><a className="nav-link" href="#services">Services</a></li> */}
              <li><a className="nav-link" href="#portfolio">Portfolio</a></li>
              <li><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <div className="social-links">
            <a href="https://discord.com/users/1111285993283256461" className="discord" target="_blank"><i className="bi bi-discord"></i></a>
            <a href="https://github.com/DreamDev0122/" className="github" target="_blank"><i className="bi bi-github"></i></a>
            <a href="https://t.me/@topluckyseven" className="telegram" target="_blank"><i className="bi bi-telegram"></i></a>
            <a href="https://wa.me/14092933880" className="whatsapp" target="_blank"><i className="bi bi-whatsapp"></i></a>
            <a href="https://www.linkedin.com/in/" className="linkedin" target="_blank"><i className="bi bi-linkedin"></i></a>
          </div>

        </div>
      </header>

      <section id="about" className="about">
        <div className="about-me container">

          <div className="section-title">
            <h2>About</h2>
            <p>Learn more about me</p>
          </div>

          <div className="row">
            <div className="col-lg-4" data-aos="fade-right">
              <img src="assets/img/me.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
              <h3>FullStack &amp; AI Automation Developer</h3>
              <p className="fst-italic">
                I'm Vlad and I'm here to help you improve your business.
                My software development experience is in Creative UI Design, Website building, Dapp development, Smart contract development and AI Chatbot development/integration.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>2 Feb 1998</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+4915212208991</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Address:</strong> <span>6 Weg Berghofer, Berlin, Germany</span></li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>27</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>vladyslavharlitskyi@outlook.com</span></li>
                    <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                  </ul>
                </div>
              </div>
              <p className='fst-italic'>
                I am a very friendly & detailed oriented developer.
                I'm skilled in all aspects of web development, from front-end design to back-end coding and database
                management. I have experience working in teams and as an individual, and I'm passionate about
                creating high-quality websites and applications that meet the needs of clients and users. With my skills
                and experience, I'm confident I can help bring your ideas to life.
              </p>
            </div>
          </div>

        </div>

        <div className="counts container">

          <div className="row">

            <div className="col-lg-3 col-md-6">
              <div className="count-box">
                <i className="bi bi-emoji-smile"></i>
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
                <p>Happy Clients</p>
                <span>127</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
              <div className="count-box">
                <i className="bi bi-journal-richtext"></i>
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
                <p>Projects</p>
                <span>263</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div className="count-box">
                <i className="bi bi-headset"></i>
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter"></span>
                <p>Hours Of Support</p>
                <span>6000 +</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div className="count-box">
                <i className="bi bi-award"></i>
                <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="1" className="purecounter"></span>
                <p>Client Satisfaction</p>
                <span>100%</span>
              </div>
            </div>

          </div>

        </div>

        <div className="skills container">

          <div className="section-title">
            <h2>Skills</h2>
          </div>

          <div className="row skills-content">

            <div className="col-lg-6">
              <div className="progress">
                <span className="skill"><span>HTML & HTML5</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>CSS & BOOTSTRAP && TAILWINDCSS</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>

              <div className="progress">
                <span className="skill"><span>JavaScript & Jquery</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>JavaScript </span><i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>React & Next</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>Vue & Nuxt </span><i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>TypeScript </span><i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>Node & Express</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>MySQL & PostgreSQL </span><i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>MongoDB</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>DynamoDB</span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>Nest </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>PHP & Laravel & CodeIgniter </span><i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>Restful API </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>Scripting & Automation & Extension</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>Bot Development </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>GIT & BitBucket</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"> <span> ZAPPER</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"> <span> MAKE.com </span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"> <span> Telegram Bot</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="progress">
                <span className="skill"><span>SMART CONTRACT </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>ETHEREUM </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
              <div className="progress">
                <span className="skill"><span>NFT - MARKETPLACE/MINT </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>UNISWAP </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>Web3</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>SOLANA </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>SOLIDITY </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>DJANGO & FLASK</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>RUBY</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>DOCKER & KUBERNETES</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>FIREBASE & HEROKU </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>DEFI & DEX </span><i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>AWS & AZURE DEVOPS</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"><span>AI / ChatGPT </span><i className="val">80%</i></span>
                <ProgressBar maxvalue="80" />
              </div>
              <div className="progress">
                <span className="skill"> <span>Llama 2 / Langchain</span> <i className="val">70%</i></span>
                <ProgressBar maxvalue="70" />
              </div>
              <div className="progress">
                <span className="skill"><span> Chroma / LlamaIndex / Supabase </span><i className="val">70%</i></span>
                <ProgressBar maxvalue="70" />
              </div>
              <div className="progress">
                <span className="skill"> <span>LLM</span> <i className="val">70%</i></span>
                <ProgressBar maxvalue="70" />
              </div>
              <div className="progress">
                <span className="skill"> <span> Machine Learning</span> <i className="val">70%</i></span>
                <ProgressBar maxvalue="70" />
              </div>
              <div className="progress">
                <span className="skill"> <span> N8N</span> <i className="val">90%</i></span>
                <ProgressBar maxvalue="90" />
              </div>
              <div className="progress">
                <span className="skill"> <span> Discord Bot</span> <i className="val">100%</i></span>
                <ProgressBar maxvalue="100" />
              </div>
            </div>
          </div>

        </div>

        <div className="interests container">

          <div className="section-title">
            <h2>Interests</h2>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="icon-box">
                <i class="ri-football-line" style={{ color: "#ffbb2c" }}></i>
                <h3>Football</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
              <div className="icon-box">
                <i class="ri-ping-pong-fill" style={{ color: "#5578ff" }}></i>
                <h3>Ping Pong</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
              <div className="icon-box">
                <i class="ri-book-fill" style={{ color: "#e90368" }}></i>
                <h3>Mathmatics</h3>
              </div>
            </div>
          </div>

        </div>

        <div className="testimonials container">

          <div className="section-title">
            <h2>What Our Client Say</h2>
          </div>

          <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    I had a wonderful experience working with this freelancer. They delivered high-quality work within the agreed-upon timeframe, showcasing their expertise and attention to detail. I appreciated their proactive approach and willingness to go the extra mile to ensure client satisfaction.
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="" />
                  <h3>Steven brooks</h3>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    Vlad H has proved to be a hidden gem. I'm happy I found such a knowledgeable, efficient and effective lead generator. I will definitely use him for other projects.
                    The contract is great to work with, provides accurate information and performs the work required timely. Would hire again.
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="" />
                  <h3>Alvin Tanpoco</h3>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    Vlad is really good at programming. This will definitely not be the last time we work together. Not only is he really good and experienced, he is friendly, responsive, and experienced. I would strongly recommend Vlad for anyone who needs a programmer. Good work, Vlad 😀.
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="" />
                  <h3>John Patrick</h3>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    I would highly recommend this freelancer to anyone in need of their expertise. He is a professional, timely, knowledgeable, and affordable choice, and I couldn't be happier with the results of our collaboration.
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt="" />
                  <h3>Joseph Bellis</h3>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    I would highly recommend this freelancer to anyone in need of their expertise. He is a professional, timely, knowledgeable, and affordable choice, and I couldn't be happier with the results of our collaboration.
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                  <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="" />
                  <h3>Teemu Airamo</h3>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>

          <div className="owl-carousel testimonials-carousel">

          </div>

        </div>

      </section>

      <section id="resume" className="resume">
        <div className="container">

          <div className="section-title">
            <h2>Resume</h2>
            <p>Check My Resume</p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <h3 className="resume-title">Sumary</h3>
              <div className="resume-item pb-0">
                <h4>Vlad H</h4>
                <p><em>I have expertise in web scraping, automation bot creation, and developing web and custom applications across various domains, such as Education, Services, Ecommerce, Financial Applications, Real Estate, Restaurants, Telecom, and Healthcare for numerous USA-based clients.</em></p>
                <p><em>In summary, if you seek a developer who delivers high-quality work, prompt responses, and 100% customer satisfaction, look no further. My skills in full-stack development, chatbot development, and API integration can propel your business to new heights.</em></p>
              </div>

              <h3 className="resume-title">Education</h3>
              <div className="resume-item">
                <h4>Bachelor of Computer Science (BCompSc)</h4>
                <h5>2015 - 2019</h5>
                <p><em>Computer science</em></p>
                <p><em>University of Applied Sciences</em></p>
              </div>
              <div className="resume-item">
                <h4>Senior Full Stack Developer | Softermii</h4>
                <h5>October 2019 - April 2021</h5>
                <p><em>Softermii, Berlin, Germany</em></p>
                <ul>
                  <li>Built and maintained a high-traffic Node.js website with over 2,000 daily visitors.</li>
                  <li>Oversaw Google Analytics implementation to track user behavior and improve conversion rates.</li>
                  <li>Developed custom post types and meta structures integrated with the WP REST API to support a mobile app backend.</li>
                  <li>Managed a Google AdGrants Pro account with a monthly advertising budget of $40,000.</li>
                  <li>Implemented dynamic, interactive components using React.js to enhance user engagement.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="resume-item">
                <h4>Machine Learning Engineer | MLAI, LLC</h4>
                <h5>May 2021 - May 2023</h5>
                <p><em>DevsData Tech Talent LLC, Berlin, Germany</em></p>
                <ul>
                  <li>Built an automated Agentic AI pipeline for generating educational visual guides and published them on the Kindle store.</li>
                  <li>Automated the daily refresh of news content enabling the entire app to work on autopilot.</li>
                  <li>Labeled data manually to train a model for clickbait detection in news articles with 83% accuracy.</li>
                  <li>Optimized the performance to efficiently fetch around 5,000 distinct news articles every day from 400 news feeds.</li>
                  <li>Fetched and parsed news articles daily, updated models and predictions, and uploaded an optimized view to AWS S3.</li>
                </ul>
              </div>
              <div className="resume-item">
                <h3 className="resume-title">Professional Experience</h3>
                <h4>AI & Automation Engineer | DevsData Tech Talent LLC</h4>
                <h5>June 2023 - June 2025</h5>
                <p><em>DevsData Tech Talent LLC, Berlin, Germany </em></p>
                <ul>
                  <li>Responsible for designing and implementing a variety of powerful, automated systems for clients—primarily using Airtable, large language models (GPT-4, Claude), n8n, Zapier and Make.com.</li>
                  <li>Developed and deployed a churn model using gradient boosting for an insurance company.</li>
                  <li>Developed and deployed a convolutional network for customer spending forecasting using TensorFlow, Ansible, Docker, ECS, DynamoDB, and PostgreSQL.</li>
                  <li>Developed and deployed a text classification system using a convolutional model using TensorFlow and Spark.</li>
                  <li>Created a open domain chatbot based on machine comprehension (Facebook's DrQA) using PyTorch, Flask, React, and DialogFlow.</li>
                  <li>Assisted in the development of a person tracking system using Yolo v2 and Kalman filters for a major Australian retail company.</li>
                  <li>Assisted with a markdown system based on demand forecasting using Facebook's Prophet and revenue optimization using mixed-integer linear programming.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="services" className="services">
        <div className="container">

          <div className="section-title">
            <h2>Services</h2>
            <p>My Services</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="icon-box">
                <div className="icon"><i className="bx bxl-dribbble"></i></div>
                <h4><a href="">Lorem Ipsum</a></h4>
                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-file"></i></div>
                <h4><a href="">Sed ut perspiciatis</a></h4>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-tachometer"></i></div>
                <h4><a href="">Magni Dolores</a></h4>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-world"></i></div>
                <h4><a href="">Nemo Enim</a></h4>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-slideshow"></i></div>
                <h4><a href="">Dele cardo</a></h4>
                <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="bx bx-arch"></i></div>
                <h4><a href="">Divera don</a></h4>
                <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="portfolio" className="portfolio">
        <div className="container">

          <div className="section-title">
            <h2>Portfolio</h2>
            <p>My Works</p>
          </div>

          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li data-filter="*" className="filter-active">All</li>
                <li data-filter=".filter-blockchain">BlockChain</li>
                <li data-filter=".filter-ecommerce">Ecommerce</li>
                <li data-filter=".filter-web">General Web</li>
                <li data-filter=".filter-bot">Automation & Bot</li>
                <li data-filter=".filter-ai">AI</li>
              </ul>
            </div>
          </div>

          <div className="row portfolio-container">

            <div className="col-lg-4 col-md-6 portfolio-item filter-blockchain">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/blockchain-1-all.jpg" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://snowball.network/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-web">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/httpsmillions.co.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://millions.co/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-blockchain">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/blockchain-3-all.jpg" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://dinox.io/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-ecommerce">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/motors.stylemixthemes.com.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://motors.stylemixthemes.com/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-web">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/httpswww.gulfair.com.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://www.gulfair.com/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-blockchain">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/blockchain-2-all.jpg" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://cunningfoxes.io/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-ecommerce">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/httpswww.shopclues.com.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://www.shopclues.com/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-ecommerce">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/httplas.pp.ua.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://las.pp.ua/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-ai">
              <div className="cards">
                <div className="cards2">
                  <div className="mx-auto image-wrap">
                    <img src="assets/img/portfolio/httpswww.newroom.io.png" alt="project-img" className="" />
                    <div className="mt-6 flex justify-between items-center">
                      <a target="_blank" rel="noreferrer" href="https://www.newroom.io/">
                        <button className="btn btn-primary btn-outline rounded-full bg-black lg:w-36 w-24">Live Demo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/sample/telegram_bot.png" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>The bot that summarizes Telegram messages using OpenAI</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/sample/telegram_bot.png" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/Screenshot_10.png" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>The bot that fetch transaction history from Cielo</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/Screenshot_10.png" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/sample/Screenshot_1.png" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>The Summarizer Bot</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/sample/Screenshot_1.png" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/discord_bot/mint-1.PNG" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>The discord bot that fetch the NFT for upcoming mint</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/discord_bot/mint-2.PNG" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/sample/zpaire_automation3.jpg" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>ActiveCampaign & Hubspot automation using Make.com (Integromat)</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/sample/zpaire_automation3.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 portfolio-item filter-bot">
              <div class="portfolio-wrap">
                <img src="assets/img/portfolio/sample/n8n.png" class="img-fluid" alt="" />
                <div class="portfolio-info">
                  <p>Automation for Business workflow using N8N</p>
                  <div class="portfolio-links">
                    <a href="assets/img/portfolio/sample/n8n.png" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3" target="_blank"><i class="bx bx-plus" ></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">

          <div className="section-title">
            <h2>Contact</h2>
            <p>Contact Me</p>
          </div>

          <div className="row mt-2">

            <div className="col-md-6 d-flex align-items-stretch">
              <div className="info-box">
                <i className="bx bx-map"></i>
                <h3>My Address</h3>
                <p>6 Weg Berghofer, Berlin, Germany</p>
              </div>
            </div>

            <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
              <div className="info-box">
                <i className="bx bx-share-alt"></i>
                <h3>Social Profiles</h3>
                <div className="social-links">
                  <a href="https://discord.com/users/1111285993283256461" className="discord" target="_blank"><i className="bi bi-discord"></i></a>
                  <a href="https://github.com/DreamDev0122/" className="github" target="_blank"><i className="bi bi-github"></i></a>
                  <a href="https://t.me/@topluckyseven" className="telegram" target="_blank"><i className="bi bi-telegram"></i></a>
                  <a href="https://wa.me/14092933880" className="whatsapp" target="_blank"><i className="bi bi-whatsapp"></i></a>
                  <a href="https://www.linkedin.com/in/" className="linkedin" target="_blank"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4 d-flex align-items-stretch">
              <div className="info-box">
                <i className="bx bx-envelope"></i>
                <h3>Email Me</h3>
                <p>vladyslavharlitskyi@outlook.com</p>
              </div>
            </div>
            <div className="col-md-6 mt-4 d-flex align-items-stretch">
              <div className="info-box">
                <i className="bx bx-phone-call"></i>
                <h3>Call Me</h3>
                <p>+4915212208991</p>
              </div>
            </div>
          </div>

          <form action="#" method="post" role="form" className="php-email-form mt-4">
            <div className="row">
              <div className="col-md-6 form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
              </div>
            </div>
            <div className="form-group mt-3">
              <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
            </div>
            <div className="form-group mt-3">
              <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
            </div>
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">Your message has been sent. Thank you!</div>
            </div>
            <div className="text-center"><button type="button">Send Message</button></div>
          </form>

        </div>
      </section>

      <div className="credits">
        Designed by <a href="https://bootstrapmade.com/">Vlad H</a>
      </div>
    </div>
  );
}

export default App;
