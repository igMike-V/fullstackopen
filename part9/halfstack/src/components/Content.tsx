interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  courseParts: CoursePart[];
}

const Part = (coursePart: CoursePart) => {
  const { name, exerciseCount } = coursePart;
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
}

const getCourseParts = (courseParts: CoursePart[]) => {
  return courseParts.map((coursePart: CoursePart): JSX.Element => {
    return (
      <Part key={coursePart.name} name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
    )
  });
}

const Content = (props: CourseProps) => {
  const { courseParts } = props;
  return (
    <section className="content">
      {getCourseParts(courseParts)}
    </section>
  );
}

export default Content