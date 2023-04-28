interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  const { courseName } = props;
  return (
    <section className="heading">
      <h1>{courseName}</h1>
    </section>
  );
}

export default Header