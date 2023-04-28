import { CoursePart } from '../types';
import Part from './Part';

interface CourseProps {
  courseParts: CoursePart[];
}

const getCourseParts = (courseParts: CoursePart[]) => {
  return courseParts.map((coursePart: CoursePart): JSX.Element => {
    return (
      <Part key={coursePart.name} coursePart={coursePart} />
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