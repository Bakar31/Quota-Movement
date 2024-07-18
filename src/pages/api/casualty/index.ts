import { prisma } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const casualties = await prisma.casualty.findMany({});
    res.json(casualties);
  } else if (req.method === "POST") {
    const {
      name,
      age,
      fathersName,
      mothersName,
      image,
      permanentAddress,
      incidentLocation,
      dateOfIncident,
      incidentDescription,
      nationality,
      dateOfBirth,
      deathCertificate,
      nidNumber,
      scenePhotos,
      fillerName,
      fillerPhone,
      fillerInstitution,
      fillerAddress,
    } = req.body;

    const newCasualty = await prisma.casualty.create({
      data: {
        name,
        age,
        fathersName,
        mothersName,
        image,
        permanentAddress,
        incidentLocation,
        dateOfIncident,
        incidentDescription,
        nationality,
        dateOfBirth,
        deathCertificate,
        nidNumber,
        scenePhotos,
        fillerName,
        fillerPhone,
        fillerInstitution,
        fillerAddress,
      },
    });
    res.json(newCasualty);
  }
};

export default handler;
