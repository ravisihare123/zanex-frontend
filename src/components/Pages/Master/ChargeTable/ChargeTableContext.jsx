import { createContext, useContext, useState } from "react";

 const ChargeTableContext = createContext();

export function useChargeTableContext() {
    return useContext(ChargeTableContext);
}

export default function ChargeTableProvider({ children }) {
    
    const [count, setCount] = useState(1)
    const [chargeName, setChargeName] = useState("")
    const [convenienceCharge, setConvenienceCharge] = useState("")
    const [overWeightCharge, setOverWeightCharge] = useState("")
    const [Id, setId]  = useState("")
    const [rebooking, setRebooking] = useState([])
    const [pTypeData, setPTypeData] = useState([])
    const [noshow, setNoshow] = useState([])
    const [cancel, setCancel] = useState([])
    const [editlist, setEditlist] = useState([])
    const [value, setValue] = useState("")
    const [hours, setHours] = useState("")
    return (
        <ChargeTableContext.Provider
            value={{
                chargeName,
                setChargeName,
                convenienceCharge,
                setConvenienceCharge, 
                count,
                setCount,
                overWeightCharge,
                setOverWeightCharge,
                rebooking,
                setRebooking,
                pTypeData,
                setPTypeData,
                noshow,
                setNoshow,
                value,
                setValue,
                hours,
                setHours,
                cancel,
                setCancel,
                editlist,
                setEditlist,
                Id,
                setId
            }}
        >
            {children}
        </ChargeTableContext.Provider>
    )
}
