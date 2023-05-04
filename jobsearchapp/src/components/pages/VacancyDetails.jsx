import { useParams } from "react-router-dom"
import { SuperJob } from "../../service/SuperJob";
import { useEffect } from "react";

export const VacancyDetails = (props) => {
  const {getVacancyDetails, vacancyDetails} = SuperJob();
  const {id} = useParams();

  useEffect(() => {
    getVacancyDetails(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `${vacancyDetails}` }}></div>
    </>
  )
}