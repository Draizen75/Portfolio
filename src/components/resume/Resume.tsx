/**
 * Resume Component
 * 
 * Displays education, work experience, and certifications.
 */
const Resume = (): React.JSX.Element => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      period: '2021 - 2025',
      institution: 'Camarines Sur Polytechnic Colleges',
    },
  ];

  const workExperience = [
    {
      position: 'Programmer Intern',
      period: 'March 2025 - May 2025',
      company: 'AI Research Center for Community Development',
      responsibilities: [
        'Provided technical support and troubleshooting for network issues',
        'Assisted in software installation and maintenance',
        'Managed user accounts and permissions',
      ],
    },
  ];

  const certifications = [
    {
      title: 'Computer Systems Servicing National Certificate Level II (TESDA)',
      period: '2021-2026',
      level: 'NC II',
      description: 'Successfully completed the Computer Systems Servicing NC II program, demonstrating proficiency in installing and configuring computer systems, setting up computer networks, and maintaining computer systems and networks. Acquired hands-on experience in troubleshooting hardware and software issues, network configuration, and system maintenance.',
    },
    {
      title: 'Career Service Examination - Professional Level Passer (CSE-PPT)',
      period: 'March 2025',
      level: 'Career Service Professional Eligibility',
      description: 'I achieved Career Service Professional Eligibility by passing the CSE-PPT, demonstrating my competence in various professional skills and knowledge areas. This certification, recognized by the Civil Service Commission (CSC), qualifies me for government positions that require professional eligibility.',
    },
  ];

  return (
    <section id="resume" className="bg-background-primary py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            <span className="text-accent-primary font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl mr-2 sm:mr-3">05.</span>
            Resume
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-primary/30 to-transparent"></div>
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Education */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-4 sm:mb-6 md:mb-8 break-words">Education</h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="professional-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl hover-lift">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary mb-1 sm:mb-2 break-words">{edu.degree}</h4>
                      <p className="text-accent-primary font-semibold text-xs sm:text-sm md:text-base break-words">{edu.institution}</p>
                    </div>
                    <span className="text-text-muted font-mono text-xs sm:text-sm md:text-base whitespace-nowrap sm:self-start">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-4 sm:mb-6 md:mb-8 break-words">Work Experience</h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {workExperience.map((work, index) => (
                <div key={index} className="professional-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl hover-lift">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary mb-1 sm:mb-2 break-words">{work.position}</h4>
                      <p className="text-accent-primary font-semibold text-xs sm:text-sm md:text-base break-words">{work.company}</p>
                    </div>
                    <span className="text-text-muted font-mono text-xs sm:text-sm md:text-base whitespace-nowrap sm:self-start">{work.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-text-secondary text-xs sm:text-sm md:text-base pl-1 sm:pl-0">
                    {work.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="break-words">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-4 sm:mb-6 md:mb-8 break-words">Certifications</h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="professional-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl hover-lift">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary mb-1 sm:mb-2 break-words">{cert.title}</h4>
                      <p className="text-accent-primary font-semibold text-xs sm:text-sm md:text-base break-words">{cert.level}</p>
                    </div>
                    <span className="text-text-muted font-mono text-xs sm:text-sm md:text-base whitespace-nowrap sm:self-start">{cert.period}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-xs sm:text-sm md:text-base break-words">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
