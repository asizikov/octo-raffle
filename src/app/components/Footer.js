const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Made with ❤️ by{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
