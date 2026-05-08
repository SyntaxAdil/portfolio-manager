const Footer = () => {
  return (
    <footer className="border-t mt-12 py-6 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Abdur Rahman Adil. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;