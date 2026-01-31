export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">
              &copy; {currentYear} Lloyd Draizen Martirez. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Built with <span className="text-red-500">❤</span> and React
            </p>
          </div>
        </div>
      </footer>
    );
  }