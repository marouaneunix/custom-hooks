import app from "../App";
import cities from "./utils/cities";
import DatePicker from "react-datepicker";
import Button from "./Button";
import { ChangeEvent, useState } from "react";

export default function Add({ changeList, wayPoints }) {
    var city: string;
    var name: string;
    var date: (() => number) | null;

    function getData() {
        if (city != null && name != null && date != null) {
            changeList([...wayPoints, {id: ++wayPoints.length, city: city, name: name, date: date}]);
        }
    }
    const getCity = (e: ChangeEvent<HTMLSelectElement>) => {
        city = e.target.value;
    }
    const getName = (e: ChangeEvent<HTMLInputElement>) => {
        name = e.target.value;
    }
    const getDate = (e: Date) => {
        date = e;
    }
    return (
        <div className="flex flex-row p-2 rounded shadow-md items-center">
            <div className="basis-1/4  mx-2">
                <select
                    defaultValue="Marrakech"
                    onChange={(e) => getCity(e)}
                    className="w-full rounded-lg  bg-gray-50 border border-gray-300 text-gray-900"
                >
                    {cities.map((city) => (
                        <option key={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="basis-1/4 mx-2">
                <input
                    placeholder="Driver name"
                    type="text"
                    onChange={(e) => getName(e)}
                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900"
                />
            </div>
            <div className="basis-1/4  mx-2 ">
                <DatePicker
                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900"
                    showTimeSelect
                    selected={new Date()}
                    onChange={(date: Date) => getDate(date)}
                    dateFormat="yyyy-MM-dd hh:mm aa"
                    placeholderText="Arrival Date"
                />
            </div>

            <div className="basis-1/4">
                <button
                    onClick={() => getData()}
                    type="button"
                    className="text-white bg-blue-600 px-5 py-2.5 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2"
                >
                    <Button icon={'add'} />
                    Add waypoint
                </button>
            </div>
        </div>
    )
}

function getCity(city: any) {
    throw new Error("Function not implemented.");
}
