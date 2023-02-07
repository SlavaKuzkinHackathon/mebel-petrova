



const reviews = ({reviews}) => {

    return(
        <div>
            <div>
                <h2>Отзывы наших клиентов</h2>
            </div>
                <div className='reviews'>
                { !!reviews.length && reviews.map(res => {
                return (
                    <div key={res.id} className='review'>
                    {res.id}){ ' ' }
                        {`${res.body.slice(0, 90)}...`}
                </div>)
          })}
            </div>
        </div>
        
    )
}

export async function getServerSideProps(context) {
    const response =  await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
  
    return {
      props: {
        reviews: data.slice(0, 20)
      }
    }
  }


export default reviews