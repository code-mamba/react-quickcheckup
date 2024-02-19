import React from 'react'
import { MainBanner } from 'src/components/pages/banner/main-banner'

import './home.css'

export const Home = () => {
	return (
		<>
			<MainBanner />
			<div className="footer">
				<div className="footer-content">
					<h1>About Quick Checkup Landing Page</h1>
					<h3>
						Quo, sunt deserunt. Voluptatibus est eveniet sequi non quidem.
						Quibusdam quisquam consequatur dolor incidunt ipsum ratione
						necessitatibus. Eius impedit nihil voluptas dolores! Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Ipsum in, impedit
						architecto suscipit, reiciendis natus ullam ducimus corporis minus
						consectetur placeat accusantium perferendis, dignissimos molestiae
						tenetur? Eligendi voluptas nostrum quibusdam! Lorem ipsum dolor, sit
						amet consectetur adipisicing elit. Dolorum quos tenetur repellat
						praesentium quis saepe obcaecati nam cupiditate, quidem minima
						perspiciatis quo dolor ut qui magni, corporis autem dicta omnis?
					</h3>
				</div>
			</div>
		</>
	)
}
