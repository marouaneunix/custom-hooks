import cities from "./utils/cities";
import wayPoints from "./utils/Drivers";
import Button from "./Button";
import Add from "./Add";
import DatePicker from "react-datepicker";
import { SetStateAction, useState } from "react";
import Divider from "./Divider";

function Action() {
    const [LocalWayPoints, setList] = useState(wayPoints);
    const changeList = (newList) => {
        setList(newList)
    }

    const handleDelete = (driver, e) => {
        setList(LocalWayPoints.filter(object => {
            return object.id !== driver.id;
        }));
    }

    const handleUpUp = (driver, e) => {
        //find the index of the element in the array
        const index = LocalWayPoints.findIndex(({ id }) => id === driver.id);
        if (index !== -1) {
            //if the matching element is found, 
            const updatedData = [...LocalWayPoints];
            //then remove that element and use `unshift`
            updatedData.unshift(...updatedData.splice(index, 1));
            setList(updatedData);
        }
    }

    const handleDownDown = (driver, e) => {
        //find the index of the element in the array
        const index = LocalWayPoints.findIndex((object) => object.id === driver.id);
        if (index !== LocalWayPoints.length) {
            //if the matching element is found, 
            const updatedData = [...LocalWayPoints];
            //then remove that element and use `unshift`
            updatedData.push(...updatedData.splice(index, 1));
            setList(updatedData);
        }
    }

    const handleUp = (wayPoint, e) => {
        let updatedData = [...LocalWayPoints];

        let index = updatedData.findIndex(e => e.id == wayPoint.id);
        if (index > 0) {
            let el = updatedData[index];
            updatedData[index] = updatedData[index - 1];
            updatedData[index - 1] = el;
        }

        setList(updatedData);
    }

    const handleDown = (wayPoint, e) => {
        let updatedData = [...LocalWayPoints];

        let index = updatedData.findIndex(e => e.id == wayPoint.id);
        if (index !== -1 && index < updatedData.length - 1) {
            let el = updatedData[index];
            updatedData[index] = updatedData[index + 1];
            updatedData[index + 1] = el;
        }

        setList(updatedData);
    }

    const handleEdit = (wayPoint, toChange, e) => {
        if (toChange == 1) {
            const newWayPoint = { id: wayPoint.id, city: e.target.value, name: wayPoint.name, date: wayPoint.date };
            const newList = LocalWayPoints.map(w => {
                if (w.id === wayPoint.id) {
                    return newWayPoint;
                }
                return w;
            });

            setList(newList);
        } else if (toChange == 2) {
            const newWayPoint = { id: wayPoint.id, city: wayPoint.city, name: e.target.value, date: wayPoint.date };
            const newList = LocalWayPoints.map(w => {
                if (w.id === wayPoint.id) {
                    return newWayPoint;
                }
                return w;
            });

            setList(newList);
        } else if (toChange == 3) {
            const newWayPoint = { id: wayPoint.id, city: wayPoint.city, name: wayPoint.name, date: e };
            const newList = LocalWayPoints.map(w => {
                if (w.id === wayPoint.id) {
                    return newWayPoint;
                }
                return w;
            });

            setList(newList);
        }
    }

    return (
        <>
            {
                LocalWayPoints.map((driver) => {
                    return (
                        <div key={driver.id} className="flex flex-row p-2 rounded shadow-md items-center">
                            <div className="flex-none  mx-2">{driver.id}</div>
                            <div className="basis-1/4  mx-2">
                                <select
                                    id="city"
                                    value={driver.city}
                                    onChange={e => handleEdit(driver, 1, e)}
                                    className="w-full rounded-lg  bg-gray-50 border border-gray-300 text-gray-900"
                                >
                                    {cities.map((city) => (
                                        <option key={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="basis-1/5 mx-2">
                                <input
                                    placeholder="Driver name"
                                    type="text"
                                    id="name"
                                    value={driver.name}
                                    onChange={e => handleEdit(driver, 2, e)}
                                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900"
                                />
                            </div>
                            <div className="basis-1/4  mx-2 ">
                                <DatePicker
                                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900"
                                    showTimeSelect
                                    id="date"
                                    selected={driver.date}
                                    onChange={e => handleEdit(driver, 3, e)}
                                    dateFormat="yyyy-MM-dd hh:mm aa"
                                    placeholderText="Arrival Date"
                                />
                            </div>
                            <div className="basis-1/4">
                                <button
                                    type="button"
                                    onClick={e => handleUpUp(driver, e)}
                                    className="text-white bg-blue-600 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                >
                                    <Button icon={'upUp'} />
                                </button>
                                <button
                                    type="button"
                                    onClick={e => handleUp(driver, e)}
                                    className="text-white bg-blue-600 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                >
                                    <Button icon={'up'} />

                                    <span className="sr-only">Icon description</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={e => handleDown(driver, e)}
                                    className="text-white bg-blue-600 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                >
                                    <Button icon={'down'} />

                                    <span className="sr-only">Icon description</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={e => handleDownDown(driver, e)}
                                    className="text-white bg-blue-600 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                >
                                    <Button icon={'downDown'} />

                                    <span className="sr-only">Icon description</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={e => handleDelete(driver, e)}
                                    className="text-white bg-blue-600 
            hover:bg-blue-700 
            focus:ring-4 
            focus:outline-none 
            active:ring-blue-600 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                >
                                    <Button icon={'delete'} />
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            <Divider />
            <Add changeList={changeList} wayPoints={LocalWayPoints} />
        </>
    )

}

export default Action;