export const Header = () => {
  return (
    <div 
      className="header"
      style={
        {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",

        }
      }
    >
      <div>img</div>
      <div>Vacancies</div>
      <div>Favorite</div>
    </div>
  )
}