/**
 * Contact Component
 * 
 * Displays contact information and social media links.
 * Provides a call-to-action button for email contact.
 */
const Contact = (): React.JSX.Element => {
  const emailAddress: string = 'draizenllaban@gmail.com';
  const phone: string = '09923630328';
  const address: string = 'San Miguel, Bato, Camarines Sur, 4435';

  const contactInfo = [
    { label: 'Address', value: address, icon: '📍' },
    { label: 'Phone', value: phone, icon: '📞' },
    { label: 'Email', value: emailAddress, icon: '✉️' },
  ];

  return (
    <section id="contact" className="bg-background-primary py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center sm:text-left">
            <span className="text-accent-primary font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl mr-2 sm:mr-3">04.</span>
            Get In Touch
          </h2>
        </div>
        
        <div className="max-w-[800px] mx-auto space-y-6 sm:space-y-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-text-secondary text-center break-words px-2 sm:px-0">
            I'm currently looking for new opportunities, my inbox is always open.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="professional-card p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl space-y-4 sm:space-y-6 hover-lift">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-3 sm:mb-4 md:mb-6 break-words">Contact Information</h3>
            
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-accent-primary font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1 break-words">{info.label}</h4>
                    {info.label === 'Email' ? (
                      <a 
                        href={`mailto:${info.value}`}
                        className="text-text-secondary hover:text-accent-primary transition-colors duration-300 break-all text-sm sm:text-base"
                      >
                        {info.value}
                      </a>
                    ) : info.label === 'Phone' ? (
                      <a 
                        href={`tel:${info.value}`}
                        className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-text-secondary text-sm sm:text-base break-words">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 sm:pt-6">
              <a 
                href={`mailto:${emailAddress}`} 
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3.5 sm:py-4 md:py-5 lg:py-6 bg-accent-primary text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold rounded-xl transition-all duration-300 active:bg-accent-hover hover:bg-accent-hover hover-lift shadow-lg shadow-accent-primary/20 touch-manipulation min-h-[44px]"
              >
                <span>Say Hello</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
