"use client";
import peoplePerson from "@/assets/lotties/peoplePerson.json";
import data from "@/data/results-people-person.json";
import Lottie from "lottie-react";
import { useRef } from "react";

import {
	CareerPaths,
	CarouselWithForm,
	ChoosingRightSchoolBusinessDegree,
	KeepExploring,
	Stats,
	StickyCta,
	SubNav,
	Tabs,
	TextWithImage,
	WhatDegrees,
} from "@/components";
import { useUser } from "@/context/context";
import dataLinks from "@/data/links-business.json";

export default function Page() {
	const carouselRef = useRef(null);
	const { results: links } = dataLinks;
	const { setVertical } = useUser();
	setVertical("Business");

	return (
		<>
			<div className="resultContent">
				<section className="resultsHero">
					<div className="group">
						<div className="heroContent column">
							<div className="intro-title">
								<span>Your ideal role could be ...</span>
							</div>
							<h1>{data.title}</h1>
							<p>{data.detailedDescription}</p>
						</div>
						<figure className="column">
							<Lottie animationData={peoplePerson} loop={true} />
						</figure>
					</div>
				</section>

				{links && <SubNav links={links} />}

				<Tabs className="react-tabs" tabs={data.tabs} />

				<CareerPaths careerPaths={data.careerPaths} />

				<Stats stats={data.stats} source={data.statsSource} />

				<TextWithImage
					content={data.textWithImage.content}
					imagePath={data.textWithImage.imagePath}
					className="whatever-you-need"
				/>
				<WhatDegrees whatDegreesData={data.degreeTabs} />

				<div
					id="explore-your-school-matches"
					className="carouselWithForm"
					ref={carouselRef}
				>
					<CarouselWithForm formId="7" />
				</div>

				<ChoosingRightSchoolBusinessDegree />
				<KeepExploring trackedElement={carouselRef} />
			</div>
			<StickyCta trackedElement={carouselRef} />
		</>
	);
}