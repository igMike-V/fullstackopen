interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  const { total } = props;
  return (
    <section className="total">
      Number of exercises {total}
    </section>
  );
}

export default Total