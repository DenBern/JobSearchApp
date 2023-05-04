import { useParams } from "react-router-dom"
import { SuperJob } from "../../service/SuperJob";
import { useEffect } from "react";

export const VacancyDetails = () => {
  const {id} = useParams();

  console.log(id)

  const {getVacancyDetails, vacancyDetails, vacancies} = SuperJob();

  useEffect(() => {
    getVacancyDetails(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {vacancies.filter(vacancy => vacancy.id = id)}
      <div dangerouslySetInnerHTML={{ __html: `${vacancyDetails}` }}></div>
    </>
  )
}