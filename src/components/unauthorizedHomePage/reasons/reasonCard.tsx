import React from "react";

type ReasonCardProps = {
  title: string;
  description: string;
};

function ReasonCard({ title, description }: ReasonCardProps) {
  return (
    <div className="p-8 rounded-lg bg-white shadow-md">
      <h1 className="text-3xl font-bold tracking-wide mb-6">{title}</h1>
      <p className="tracking-wide text-gray-500">{description}</p>
    </div>
  );
}

export default ReasonCard;
