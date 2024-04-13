import { ProjectListItem } from "./"

export const ProjectList = ({ projects }) => {
  return (
    <ul className="mt-2">
      {
        projects?.map(({ id, title, description, start, end }) => (
          <ProjectListItem
            key={ id }
            id={ id }
            title={ title }
            description={ description }
            start={ start }
            end={ end }
          />
        ))
      }
    </ul>
  )
}