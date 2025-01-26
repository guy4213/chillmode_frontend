import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Trailer } from "../components/Trailer";
import { Actor, Category } from "../@types/types";
import StarRating from "../components/star";
import { useAppState } from "../AppState";
import { SeriesService } from "../services/series-service";

const SeriesDetails = () => {
  const nav = useNavigate();
  const location = useLocation();
  const seriesProps = location.state;

  const { Name, seriesDetails, setSeriesDetails } = useAppState();

  const fetchData = async () => {
    let id;

    const ratingString = localStorage.getItem("rating");
    const rate = ratingString ? parseFloat(ratingString) : 0;
    const userID = (await SeriesService.getUserIdByUserName(Name)) as number;
    if (seriesProps) {
      id = seriesProps?.id;
      localStorage.setItem("seriesId", seriesProps?.id);
      const response = await SeriesService.getSeriesByIdAxios(id);
      console.log(response);
      localStorage.setItem("seriesDetails", JSON.stringify(response));
    } else {
      id = parseInt(localStorage.getItem("seriesId") || "0");

      try {
        const response = await SeriesService.rateCalculate(userID, id || 0, rate);
        localStorage.setItem("seriesDetails", JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    const storedSeries = localStorage.getItem("seriesDetails");
    console.log(storedSeries);
    setSeriesDetails(storedSeries ? JSON.parse(storedSeries) : null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [prevRating, setPrevRating] = useState<number | null>(null);
  const [ratingChanged, setRatingChanged] = useState(false);

  const currentSeriesDetails = seriesDetails || seriesProps;

  // Detect if the rating has changed
  useEffect(() => {
    if (currentSeriesDetails?.averageRate !== prevRating) {
      setPrevRating(currentSeriesDetails?.averageRate);
      setRatingChanged(true);
    }
  }, [currentSeriesDetails?.averageRate, prevRating]);

  return (
    <>
      <div className="text-sm flex items-center justify-center mb-5">
        <div className="text-center text-white bg-black rounded-lg shadow-lg p-1 min-w-40 max-w-60">
          <Trailer
            trailer={currentSeriesDetails?.trailer}
            src={currentSeriesDetails?.img}
            alt={currentSeriesDetails?.seriesName}
          />
          <h1 className="text-lg font-black mb-3">
            <b>{currentSeriesDetails?.seriesName}</b>
          </h1>
          <div>
            <b>Year published :</b> {currentSeriesDetails?.publishedYear}
          </div>

          {/* Average rating with style change on update */}
          <div>
            <b>average rate is: </b>
            <span
              className={`${
                ratingChanged ? "text-green-500 animate-pulse" : "text-white"
              }`}
            >
              {currentSeriesDetails?.averageRate.toFixed(2)}
            </span>
          </div>

          <div>
            <b>Number Of Episodes is: </b>
            {currentSeriesDetails?.numberOfEpisodes}
          </div>
          <div>
            {currentSeriesDetails?.seriesDescription !== null && (
              <span>
                <b>Description:</b>
                <br /> {currentSeriesDetails?.seriesDescription}
              </span>
            )}
          </div>
          {currentSeriesDetails?.categories.length !== 0 ? (
            <div>
              <b>Categories are: </b>
              {currentSeriesDetails?.categories.map(
                (categoryItem: Category, index: number) => (
                  <span key={index}>
                    {categoryItem.name}{" "}
                    {index < currentSeriesDetails?.categories.length - 1 && ","}
                  </span>
                )
              )}
            </div>
          ) : (
            <div>No categories have been provided</div>
          )}
          {currentSeriesDetails?.actors.length !== 0 ? (
            <div>
              <b>Actors are: </b>
              {currentSeriesDetails?.actors.map((actorItem: Actor, index: number) => (
                <span key={index}>
                  {actorItem.actorName}{" "}
                  {index < currentSeriesDetails?.actors.length - 1 && ","}
                </span>
              ))}
            </div>
          ) : (
            <div>No <b>actors</b> have been provided</div>
          )}

          {currentSeriesDetails?.director !== null ? (
            <div>
              <b>The director is: </b>
              {currentSeriesDetails?.director.directorName}
            </div>
          ) : (
            <div>No <b>director</b> has been provided</div>
          )}
          <StarRating
            key={currentSeriesDetails?.id}
            id={currentSeriesDetails?.id || 0}
            initialRating={0}
            fetchData={fetchData}
            button={true}
          />
        </div>
      </div>
      <button onClick={() => nav("/seriesList")} className="ml-4">
        <Button class="return" text="return" />
      </button>
    </>
  );
};

export default SeriesDetails;
