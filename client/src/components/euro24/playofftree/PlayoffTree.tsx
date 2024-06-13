import React, { FC } from "react";
import { IEuroTable } from "../../../pages/eurocuppage/EurocupPage";
import style from "./Playofftree.module.css";

type Props = {
  arr: {
    qt?: [
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[],
      IEuroTable[]
    ];
    sm?: [IEuroTable[], IEuroTable[], IEuroTable[], IEuroTable[]];
    fn?: [IEuroTable[], IEuroTable[]];
  };
};

export const PlayoffTree: FC<Props> = ({ arr }) => {
  const { fn, qt, sm } = arr;

  return (
    <div style={{display:'flex', flexDirection:'column', gap:50}}>
    <div
      style={{ display: "flex", width: 375, justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", gap: 30, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{qt?.[0][0].user_name || "A1"}</p>
            {qt?.[0][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[0][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{qt?.[0][1].user_name || "B2"}</p>
            {qt?.[0][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[0][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{qt?.[1][0].user_name || "C1"}</p>
            {qt?.[1][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[1][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{qt?.[1][1].user_name || "D2"}</p>
            {qt?.[1][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[1][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{qt?.[2][0].user_name || "B1"}</p>
            {qt?.[2][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[2][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{qt?.[2][1].user_name || "A2"}</p>
            {qt?.[2][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[2][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{qt?.[3][0].user_name || "D1"}</p>
            {qt?.[3][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[3][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{qt?.[3][1].user_name || "C2"}</p>
            {qt?.[3][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[3][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 80,
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{sm?.[0][0].user_name || "A1/B2"}</p>
            {sm?.[0][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[0][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{sm?.[0][1].user_name || "C1/D2"}</p>
            {sm?.[0][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[0][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketTop}>
            <p>{sm?.[1][0].user_name || "B1/A2"}</p>
            {sm?.[1][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[1][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketTop}>
            <p>{sm?.[1][1].user_name || "D1/C2"}</p>
            {sm?.[1][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[1][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <div className={style.bracketTop}>
          <p>{fn?.[0][0].user_name || "A1/B2 - C1/D2"}</p>
          {fn?.[0][0].forecast_points && (
            <>
              <p style={{ fontSize: 25 }}>{fn[0][0].forecast_points}</p>
            </>
          )}
        </div>
        <div className={style.bracketTop}>
          <p>{fn?.[0][1].user_name || "B1/A2 - D1/C2"}</p>
          {fn?.[0][1].forecast_points && (
            <>
              <p style={{ fontSize: 25 }}>{fn[0][1].forecast_points}</p>
            </>
          )}
        </div>
      </div>
    </div>
    <div
      style={{ display: "flex", width: 375, justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", gap: 30, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{qt?.[4][0].user_name || "A3"}</p>
            {qt?.[4][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[4][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{qt?.[4][1].user_name || "B4"}</p>
            {qt?.[4][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[4][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{qt?.[5][0].user_name || "C3"}</p>
            {qt?.[5][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[5][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{qt?.[5][1].user_name || "D4"}</p>
            {qt?.[5][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[5][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{qt?.[6][0].user_name || "B3"}</p>
            {qt?.[6][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[6][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{qt?.[6][1].user_name || "A4"}</p>
            {qt?.[6][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[6][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{qt?.[7][0].user_name || "D3"}</p>
            {qt?.[7][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[7][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{qt?.[7][1].user_name || "C4"}</p>
            {qt?.[7][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{qt[7][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 80,
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{sm?.[2][0].user_name || "A3/B4"}</p>
            {sm?.[2][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[2][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{sm?.[2][1].user_name || "C3/D4"}</p>
            {sm?.[2][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[2][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          <div className={style.bracketBot}>
            <p>{sm?.[3][0].user_name || "B3/A4"}</p>
            {sm?.[3][0].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[3][0].forecast_points}</p>
              </>
            )}
          </div>
          <div className={style.bracketBot}>
            <p>{sm?.[3][1].user_name || "D3/C4"}</p>
            {sm?.[3][1].forecast_points && (
              <>
                <p style={{ fontSize: 25 }}>{sm[3][1].forecast_points}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <div className={style.bracketBot}>
          <p>{fn?.[1][0].user_name || "A3/B4 - C3/D4"}</p>
          {fn?.[1][0].forecast_points && (
            <>
              <p style={{ fontSize: 25 }}>{fn[1][0].forecast_points}</p>
            </>
          )}
        </div>
        <div className={style.bracketBot}>
          <p>{fn?.[1][1].user_name || "B3/A4 - D3/C4"}</p>
          {fn?.[1][1].forecast_points && (
            <>
              <p style={{ fontSize: 25 }}>{fn[1][1].forecast_points}</p>
            </>
          )}
        </div>
      </div>
    </div>

    </div>
  );
};
