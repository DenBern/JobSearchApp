import favorite from '../../assets/png/Save_Button.png';
export const Vacancy = (props) => {
    const {profession, payment_from, payment_to, type_of_work, town} = props;

    return (
        <>
            <div className="base"
                style={
                    {
                        display: 'flex', flexDirection: 'row', backgroundColor: 'pink'
                    }
                }>
                <div className="wrapper"
                    style={
                        {
                            display: 'flex', flexDirection: 'column'
                        }
                    }>
                    <div className="name">{profession}</div>
                    <div className="wrapper"
                        style={
                            {
                                display: 'flex', flexDirection: 'row', gap: '10px'
                            }
                        }>
                        <div 
                            className="salary">з/п 
                            {
                                payment_from && payment_to ? 
                                ` от ${payment_from} - до ${payment_to}`
                                : payment_from && !payment_to ?
                                ` от ${payment_from}` 
                                : payment_to && !payment_from ? 
                                ` до ${payment_to}` 
                                : ' Не указана'
                            }
                        </div>
                        <div className="employment">{type_of_work.title}</div>
                    </div>
                    <div className="location">{town.title}</div>
                </div>
                <button style={{backgroundImage: `url(${favorite})`, width: '24px', height: '24px', border: 'none', backgroundColor: 'inherit'}}></button>
            </div>
        </>
    )
}