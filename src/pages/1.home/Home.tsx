import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

const Home = () => {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/api/scores")
        .then(res => res.json())
        .then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

  return (
    <div>
        <div>
            <h1 className="text-3xl">{"Today's Games " + data.date}</h1>
        </div>
        <div className="grid grid-cols-5 gap-5">
            {data.scores?.map(score => (
                <Card className="flex flex-col justify-between"> {/* add key in here based on the game id */}
                    <CardHeader className="flex-row gap-4 items-center">
                        <CardTitle>
                            AWAY - HOME
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{score}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant='outline'>Details</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  )

}

export default Home