import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Box, Button, Page, Tabs, Text } from "zmp-ui";
import api from "zmp-sdk";

import BookingItem from "../components/book/booking";
import { getConfig } from "../components/config-provider";
import { DEFAULT_OA_ID } from "../constants";
import { bookingsState } from "../state";

const labels = {
  upcoming: "Sắp đến",
  finished: "Hoàn thành",
};

function ChatPage() {
  const [status, setStatus] = useState<"upcoming" | "finished">("upcoming");
  const allBookings = useRecoilValue(bookingsState);

  const handleOpenChat = () => {
    const oaId: string = getConfig((c) => c.template?.oaIDtoOpenChat || "");

    api.openChat({
      type: "oa",
      id: oaId || DEFAULT_OA_ID,
    });
  };

  return (
    <Page className="min-h-0">
      <Box m={4}>
        <Box className="flex flex-col w-full py-4 bg-white rounded-md justify-center items-center">
          <Avatar size={96} className="shadow align-middle mb-2" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFhUXFx0YGBcYGBobGBcbIBgXGhcYHBgaHyggHhsmHhkYIjEiJykrLi4uGR81ODMsOCgtLisBCgoKDg0OGxAQGzcjICUvLTIvNzIvLzI3MC8tLS0tLS0tLy0tLS0tLy0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAEQQAAIBAgQEBAIHBgQFAwUAAAECAwARBBIhMQUiQVETMmFxBoEjQlJikaGxFHKCktHwM6KywRZDU2PxB4PhFSRzwtL/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QAOxEAAQMCAwUGBAUEAQUBAAAAAQACEQMhBDFBBRJRYXEigZGhsfATMsHRBhRS4fEjJEJiM0OSorLCFf/aAAwDAQACEQMRAD8A+40pSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSleGcDcgURe6UpREpSlESlKURKUpREpXhXB2Ir3REpSlESlKURKUpREpSlESlKURKUpREpSlESlK8saIjGo7iHFUhsDdnbyxpYue5tsB6mwrn4vxNgfBhsZbXJOqxA7M3cnovX2qtzyKquFLAmQLLiGOpsMzsX30HINrE2G1ZG0NqNw5+Gwbz/IdedjDcyrNHD78F2SlHxk0pIaRYQACUjYGQA3tmcjS9j5QNjqag8TDHLFM4izrlyxSSkySOx0DKXuQtyLG+u4036VeNklbK0weSz3sg0Ayg5yvIFsPXXTWumGRpzCmVAGkDWjfOAkfMbmwF8wUaX3rnW1sViazWvcbuA4RqYAg8c9JzN1dAFMWEQrhCLAe1bL1E4njCISqAyON1S3L+8xIVfa9/Sq/xX4qCXEk6IeqQDO/sXYWH8o966ytj6FF24TLuAuffWFmtpOcN42HOyumatT4lBu6j3IFfKsZ8YRnTwnkH/fkNv5Lla4f+L22XD4df/bv/AEqv+frE9iie9zR5XKhdiMI0w6qJ5X9F9jTFIdnU+xBrbmr4uPi9jo2Hwzf+3b+td+D+MIxp4UiD/sSso/kuFoMfXHz0T3OB9YX1uIwj7Nqjvt6r62K8sKpnC/isPYRzo5+xOPDc+zqLH+U1YMNxdGIVwY3OyvbX91hofa9/SrFHH0KztwGHcCIPgc+6VK6i4CRcclUYMNHHGj+EABmWSSMlJVIaxYsliRcG+tTEWKmjK5JRKrC4SU8xGl8sg12P1g3uK0Yp2hedAENm8UB2yjI++tj9cMP965XePwkbK0QSQFLWcXO4AQnlILDpa+1co+vicNiHtpuNnHnY3bIPdlpnkFpEfEEkTKtHDuKpKSuqSAXMb2DD1FtCvqLipQVQYZEKgOWYePaKYHUBrlD4l73B5D6771YeFcTfP4E3ntdHAssoH6OOq/MdbdBs/aza7vhVey/yPTWeWfBU62H3bty9+Xmp6lYBrNbCqpSlKIlKUoiUpSiJSlKIlKVy4rHRxW8SREvtmYC/40RdVR/GMZ4MZYC7EhUXux0A9up9Aa7I5AwBBBB1BB0NV74ixCrNHnICRo0pv9q6ovvoX09aq42uaFB1QXIFuunmpaLN54EKKixYiKHOCriR5ZCNSyWDN+NxbsABWnDwKkfjShsq6xxnUgsfMV6ysx+VwB3rjlny+AssREJdmDMOd/NIE8NbsLmxte5yG4rtxTPKQzC1j9HGHRZFJGkjZri/ZdbXvvtwz2kGSfmuTOdzqYEnW9gM5Wtux74fXjyWjCWYKhbDMxJciRXYhzdm7DTYegFeMRxNI808j5Y3ASKOPSR0GxNvKrNrpa4y3PSo3jPGsimMPI99HDspBI8yKyAXW/mOxtl72qWIxDyuWYlnb8fQADp7VqYLAvcTVktzy4HODAidTnGWaztobQZhoYBLzED0J4Tpr0lSfFPiOWUZFtFENo49F+dt/wBPSocAnax/d09f0qf4R8OGQK73VSwuNiVzWOp20DHuLX7VJnEiKMiGBvEJbULyWBOWzbsoPNpuba23ujEUaJ+HQbPHh3k59Ss9uy8Rihv4t5H+o0vlGQ8DzVMK76beg+dZt10pIL6km9zfve9eRWk0yJWDi6NKi4tHPXLhNvfJeraX0/v0oEPavDVth5SCpbNcWtuD0t0/WjiQPfmvuDo0az2tcPA37pB6wL8lh1toQAezf3epfhfxFLEMjfSxHQpJrp6X1FTfjrMiiXDuHzAG4tGFbcZ91F7kX2OgOoqJ4v8ADxiBKksoYjUa6MVFu+uX+Yb9M38xRr/06zY4T5Qc+hstw7KxOFAfhHz/AKkZ3yAy9JOSs0HFBIEmifOsYIkjk1kSNrZrH6yggNrc6Gx1tW3F5VDKGwyFrOCqMpzA5ozpodd6+eYbEPC4ZCVdfy7g339jVu4JxnOuTO0YGwQqMpOyksDaMnY/V2OmW9LGYJ7XCoTvAcZmOZgzGnEEq/s7aDMSCwiHjMd+nTXUeEzOIgEkRmiBu3+LGNCSDzW7SqRoeuXXpbfJjFlz89kWOORJB5lYlrN7iw0t3HWtUPiRNmW5JNpIzJGXfvIuWwzi1rdQB1FcYnLtOkURaI5XZgLSIW1ZPDYAmxBa19M+grLa2TIMxBBnK4t1/SdQYmVp7u970sD+3JXjgmNMsd2ADqSjgdGG9vQixHoRUnVX4BiladyjApJGG0+0jFGv2PlBB7VZHcAXJAA3J6V3OCrmvQbUcIJz5EWPmCsmszdeRC2UrkwuPilv4ciPbfKwNvwNddWlElKUoiUpSiJSlYNEWGqsMo/aJs9vEuLX3EduS1/q3zfO/Wu/4gxbKixo2V5DYMN0UC7vtuBoPVhVdx+O5Y5pSr5BdJbC0sZsWVhawe1mFtyulr2rD2yademcNvQ+A4DKY0nKTFhrZW8NTdmNbe/eUqV4FMsbYjXLEhV7nyglbvb00B9ye9ccrLNJ+0zALkQmNDuqXv4jD7RsD6bb3rThG8UkWIRn8Z/vDQQIR05QrkW6r3NacLilLq8rLmlUxqljqVd997DYXPWsjG4qr+XbhWzIaN7U5Tu+E7x0hWgwb7na/tB8fRJ0ZcMJmzZw4mt1AJ1UD0Qla4+LTgiWWWJY0jYDQKZpXsOUuBoAbXykne5FiK2Yl3ePEM12tEwzDSJT9hAfORbVz1GnUCsfGGPzOsCk5YhY/ekOrsfXU/O9QYHDiq+IvMyP8RYwPJosc14xeJbhqLqhi2XfkPfMqDxeIMjFmsL9BoANgAOgHarRwPhaRZZJmALLYKQLXNjbXdipt6Zj2qP+GOGCVmLqSqrcaaE5gtvWwJNTmLxbLFnaIZUUKozKb6AZmujAMQBpuB71qY2tJ+BTy1y1yufNZ2ycG6Diq93uveLA5G85jwC38SmVEBxFnRfKmQjK2tyFc2lOvoKgOJfEhOkBdF2N8tz00S1l9wb1CYqbOxawW+thsPb+7dqluFcCBTx8Q/hQDqfM/ov9aNwtDDsFStflbM8APmJ+snioqu0MRi6po4Ow1d14CLd0lQ/Mx+0x97n+tSEPw7im1EEvzGX/AFWrsxHxUsQZMFCsajd2GaVvW52+d6iMRx3FMSWnlPLfRyo69FsKm+PiX/I0NHMyfAC3RXqH4S3xvV3EuPE/yf8AuMrrn+H8Ug1w7/Jc3+m9cALI32WU+oIP6g1tg49ilIy4iUaX1ct+TXFS+G+KhKAuNhWVTpmUZZF9dP8Aa3zp8fFM+doeOUg+BsUr/hLdG9QcZHA/wfNZ4d8SMLjEZ5AdiMmmlrZCAp9zrVh4bKpQGCyxkgmLKzXIsb8pyxEgWttsdKrPFuAhUE+HfxYD1+sno/8AW3vUVgsQI3DFQwGtun4f1uPSoThKOIYX0O8R9NCqVLaFfDVRQxokHJw5cRrwJsQrDxzhSSZpoWDBVFwBvlC+Ibb35hpfoarmFxDRuGXp0OoIO6kHcEaGrrh5y0eYQgJKtnBKgqNmZSqKDy3uL3sB2qufEfD/AAnUhbBkVyLWAcjy26HravuCrf8ARffheZgZW8eq9bYwZEYuj87c44DUxw1Oo6K28KYfRyQxJJHJcZSF8WNwPIrEa7G2YjbfUCuyGNnw8si5hIZmkAub2Q2VT/CoFvWql8HY6ztAxssq6H7Mu4Yeun4gVZcPI6Q4dgSD4YGfeNibXWRR5QT9cbH8Dl4ygKb4HzbwgnItvEic7EGM8ytLCYoYmi2qNY8swb/TKJUjE6o64qAAs65nTrJHy3Zfvi499u1u3juLSRcPY5opJLk9GsjMtwegYA27jXY1E4vEgMzRlQ8ETApbQEmMi2gBAtb+lbcZeM5V1XP4yAa2cX8dP4kLsB3B71Ns/Fv+C7Cu/wAg4M4zE7vORke6TYKRzRvNd75eGfiu98vjQ5SBLm5bb5P+Zf7uX5XK9bVaQaoXD8dfxJosq5hrIRywxi9rD6ztqx7Ai+1jYvh3FsweN3LtGfMbXZGuUYgfNf4TWrsZ1OhTGGLpfmRwmOz1Go0uq2JpuzOlufvqpylKVvKmlKUoiVg1msGiKtcScHEtmIAjhVRfu7Ekf5EqJWyQeFIhYGUxKp0upY5T7BBf5GurjRGfE3Ust0DAbhci3Yeovf5VHz4gMUicktkAXED/AAxI6kA76ErqDtzW668JtMOqYyoTlP8A6tH3gxfhK1qTeyO70/dYQHI0Vy7+Ikwk0+li8Ree400Asbdh3rxJGvg+PYAyTIV08qeIClh7XY+rGvHEHJiLR2UxhlhGuZoAoR2P3dQw0+qp6138QF/BiTNyL4nJYnKqlUtfS5LC1/smq5cQ4OcbuMnnAk9Zt5jRTTked+72FHcTxOWCeRjK/LkDOMkZzMBZYzrbrcg6Dc1QlDSSDW7O25+0ep/G9Wn4quIgtiGzB3JfOxGoQMRoDfMbDQZar3BcKZJQFbKVvIDa45Tc31H61u7OaKVB9T3YctJWFtUCrWw+G0Jk9Mh9fFW7BRKkUULXDBTnCiwAs2a7dFZja9xsRVd+JsUDJ4aqy5TrfS5PXKNAPe59atLym7Ow8MAkG4zHMrOzso3YXc2AAOupFqomOfM7HnF2Lc2/zO9+/wA68bOYXVC52Yv3kqztisaODIbYkhojz0jK3RSHw9w5ZWaSU2hiGdz0Nvq/P+964fiHjDYmTm5Y10iA2QDQfxf+Kl+NP4GBhhHmm+mk9vqj9P5aqosNNvRtvxqamfj1DWN8w3pkT1cZnktzYGzWYbDgxc+uv2HCFm/f2PtW/h2EMsqRA2LErfsN7/hXLm/skf2RVu+AMFmaSbooyg+ptf8AAWHzqTE1fg0nP9zp5rZxNQ0qZd4dSqviYCjNG2jA5D8r3rX7bnQeg71a/wD1E4fknEuyyrr+8NDr6jL+dVLN/YOv/wACmGqivSbUGvs+BX2hU+LTDwMx/Pmpf4e4y2Gk5RmjbSQHZh10+0Na7PiPhyxMskRvDKM0Z6AfY+Vx/YqvAj39F2/GrTwVvHwU8Lbw2kj9h5h+v81RVj8GoKw6O6GwPGxjuWLt/ZzcThyY7Q9dPtzla/hjELmMbIzBtQQL2PqD09QQd/lP4yBZY5IRdn0y5hrbkyNm+sotlDa39dTVN4ZLkkQ8+jA8nn36evp1q9pOwKsoEgOikAAByM4d+qrYMSCL3G50qHaDTTqhzeo6j3cd/JYmyapr4Mb94lpnlpwyt01VAVjG9xuvMD94a/qKvvD8ReCORDMtiy5kGdVAOgeLci1tQL+oqlcYwRhkKsbkgNtbzC9rVY/hgXisAbkllIkyMGDAMFba5BQ2Ohub1JtECrQbUBn+CDyieMiJsVV2R/Sq18OdDIjvHpu+CmfDVoWmADGOV3OmjITzi3Yrrbuor3MxMfhglXeZpRJp9Emct4mum1gNxzdr108LNmkjfN9Iok58oY6BJAcvLfQXt9qo7hUpSLxHysSAHXcjDDNEjD0+ufQt2FYG8S8kH5TI77iNLGeGS3RN+73wz4rukAOGeGJCMriIqNdGZbvp3Rs1/WpTAyAYqMqQQ6PGbd1IYDTqOcVDYWURv4SG7FTGZm8mdFJUHuQu5Ha3t08GIvhMq2XxWyk7uDFLdz6sbt8xVnA7zMbTOk2nXeBBN76GJvnIChqN7Bnn6a+Cu4rNeVr1XeLJSlKURK8tXqsGiKq8Sjbxp1Q5WZEdT02K6+nJY+lRWARXaSJkyBoV5bWylS0bgexC2I7ip3jkeSWKXYEGJj2LEFCfmpHu9VvECSWWKMOrXzgzIRdoNBIpA2a+QZl0322ridqUHNxdQTAMOm9rX8N3XuWrh3bzB09P4WvDeNJmyEXBMU00gGTKl1yJa2YE3Y69SL9vOK4csVk8WWVzGxYmQqFREIUgJa4zEAA33Y1IY+FTeKOygxPDl2CsArKv8pY1owUzNJmCgmW6i/1cPGCoNu7MQf4qptqvPabYcMr3jePcTAgCIAkqwHTlYe8zyubcI1Vc43CVwSlgoZ5zmC+WwVwoHoAB87nrXF8JKfHupswBIFr5hazC3sSQNL2qT4wL8PQblJhf3KDQ/jUL8OFRiEzNlNzla5Fmtpcjodvw3Fwd6mJw9Yf7P5628vusHHOjatJx1n1dA+itufKshWzzXOVFOYC9vCNzsoSzgdyx1tp8/v1+719q+k4lH51sQzqQpIAyg2ja9tCdBqANDevnMqZWZd7ErfvYkX/KvGy3B28BnA10ytyEHzM3C+bcHZpP0DhJ8+mimfj5h+0outkhQC1/XtVew07IwcFrqbi4BH59KsfxzzHDzg5VkhF/3hqf1/Kqz+J9SbCveCvQaOo8yF3mEh1BoiR++uvkvpfw1xmPELbJGJQOZCg1+8p3I/GpqVkVScuUWubAW99Nz/tXyv4ZwrSYqJUJBzXLDQhRq3r0t86+rzOt+wAuT3t69hWDtDDso1gGkkG8cPvOixMbQbRqQ05+SyXDC5TNppcCwHz61W/iPj0eHBRVRpfshQQvbMd/kNasSgHlvbNcKw3B16/PSvjuNhZJHV/MrEMTfe+99/nX3ZeFp1nu3tItx593JesBhmVnne004rziJ2dizFsx1NlsPwtpVh/9PtcQ6a2aGS9791/qarX4+4NxVo+B7p+0T3uEhI+bagf5a3ccP7Z7RyA6kwPMrZxcNoOEWj6iFAwsQwN9QoIPrvX0EkMsbMAsgPPGbgDlcSkAHVOoA6npmqhYKLM6JcDMwUHtewFfRMOrMy286xgPYCxNwoNzfKbocxN7ZPUGo9qGC06x7Hfx0hcLsSN2o8ZFxIzy6Za55qmfFCsMS+ZrsSCduW4Fl02AHTXrqd6lPh+AvhHAyllnuMwup+jsQfQi4+fpULx91M8mVswzatcnM31iCfq3vap/4fBTBF+8r2/hhI/UVO//AIKQP6mj6npYKLBOJ2pVc28etv3Ulw/h4lCoXlikEKOjCQsCGTK/K9xobggfd9KzOJogCSpy2EEsY5ArAJkk7JezXv0Gu1bsbM0bi4scOEYWvzwEZJAe5Vhm0+yO+vRw6EKVjksQsYiA3DZiT8+VAfxrnjUdG8e0M4+xuYLSLZdojp0Tnxc3H76e9YXnHxJF4MeQyKsbsVtcuSBGAe5Zn1+dSOAibxcKrm7As5tsOQiw9BnAHtUQniwyyR51ACrllkOiQktZQPrMGuLnS2Xc1Y+Cpnnkk3EaiIHu180h7fZHuDVvZlFz8XTAMgdonunuBLss+6FBXO6w9M+v8lWFRXqsCs126yUpSlESsVmsGiLl4hhFljaNtmFrjcdiPUHX5VSYLw4iZpI7MqIjuBykEyf/AHFuxyrfqLHtVuxvGIIzleQA7kAFiB3NgbD1NV7jzo0olV+V4VZZF1UZHbmNt0+lF/S/yxtsUWVaBdm4QM9CRI9hXMK5wO6RY/yscNQuxaQfSJZTpyva+SVfdSwt0vbpXFiXaOZ5X5bkAW1IgS1gLdXkYaetdXDnYJIlgAq6JfVDY2A7xndT206aOJL4scUo6EOFtfObfRi/YMQ3yrjbCtD/AJTbpabdfdrK4D2uShsbBmjxsNtQTMo/iz6fwlRVGwkiqyllzKLFl7jqPevoCHw5kc6qQyMTrmytkcn3uregQ1SONYAwTSR9Faw/dOq/kRXRbNfd1InMA66dk+EA9CsbbjXMNPEszaRPp6iO9XMRRkJJE4ddVFnP2GyjJ9Uk2QgAX0sBa1VT4nwwTEPlHJoFNtCQiBrdDre/qasHAMcksaqVdXQ2DKFKhrcjDMRlbuB5tdDfTHE8CJ420y+GpZQdywjTNfr9Uix9TvaocPUNCv8A1CYFvE29gLQxtAY3ClrTmAW+o+3VR/Dh+14N8PvLCfFiHcfWUfiR8xVTZea27fkK78HinhkV0NmXmH+4I7dLVP8AEOGJjkM2GAEnmmh6k9WXv/v71cf/AGzzPyOMz+k8+Rznip/w9tYPZ+XrWc3OdCLX9D+k55rg+F8fFhhJO5u5+jVR5iNC1uw2Fz2rk41x+XEGzHKgvZF226n636VGSDKWuCMumosQexHSswwM7ZEUs2Q6KLk99K9ihT+Iars+enT9l0ooMDzVOenL3xUxwf4jlg5T9JHfyE6jT6rdPatXxJi45pRNGfOBmFrFXGmo9RY1H4rCuhyujIStwGBF7G19a1xqXIABObQgC5v6CvraFPf+I0aaZEL6KFP4nxGZ3yiCPReQNbDRu3Q+1W7iKfsmDTDmwlmPizW+qNAq/kB/CacN4amBUTYoBpt4oeo+835e3qagcbimndpHN2Y5j79gKjZ/c1AR8jTM8TpHQ3niuZ/EG1mtZ8CjdzrCOJt5ZA6nkpL4VwqvNZhplaxtcBrEL8+3tVmcR5GklkATmGUucxA3XJezPe66g2sb3JrRhMG0EfhrclgrkjU5/CsMo6i7A2+4e9afiPHpHGURHLOdWZUy/ffQnO5Pfa9Uq73YirLJgxHIceRM90KDC0W4HCgE2aJJ8z04DpzCqE8gLMQAoN2A6AX2+W3yq94XDlYMLCd2tIRsbswOv8Akqn8DwBnnSMbE6+ibn8h+JFXiY55WYeVRpbTKpPhRsD6DxX+Yq1tGpD2sb/iCf/keZJ6CyzthMc/4mJfm4+n2J8ltjlMsqSRksVc76ExsckqH1SRQbdLAda7+JoVdXQXka6oLcoYgAyMfuqLfl1rxwqPw1kkY6nmdbWysBaQg72YrevGNmYxRqcpMguUBszm1yg7L1Y9h61zZG9VDW5C2fKffHLVbU9oRlkubFXlmgZI87c8aMQMpPIfGt0VSD79NxV24bghDGsYN7bnqxJuzH1JJNVfgjp4yuXBVI5HZzoupRQRfZAAwH7vXc2HCcaglIVJASdgQRm/dzAZvlXYbGpMZQDtTIz0BMAep/hVMSXGGgWCkxWawDWa2lSSlKURK8mvVKIqgJ0hLiVgjGR2JY2zXYkMCdxYj22qIxuFaNknifJGZD4gsCAHsM9jtzBcw00N9DevoUiAixAIPQ1E4rgOFcENBGMwtdQFOvqtjWA/Yf9V1VlSN6ZBEyDp7GgV2liw3MfVQXDUKPlYZQQVAAzIdfqPuo35Dt02riwWKMcLr1w2IKn/8eblPyRr/AMJr0pkgd0JC5DzE3ZHB8srgaoWGucXF819RXPjgFxalreFi4/BexuufXLr1uDaudrUHMqFlQeHFufi2dTor9MSSM5AI7vuJ8lsmwBCyuVJEbrkv9dFS0h9SweTXvaov4o4d4sIkGskIAY9XiOqOO+m/8XapbhMzyrHC+r4eYrL6qqsEb58p/GumLDlSUQXeG5UdJIGPk7cp0HbKvQmvdGs+m+Z7TbjgRkfEXysDOiixNIVGmlUyNu7IfdfNuF8ReB8yGwIysCLqyncFev8AferxAc48ZPDZSFzhTYDLbXU3DZbixGotqOta+JeCiI+NDrA50/7Z6oe2v9OlRvCsaInzGNXG1jofkdR+IIrbq0mYtgrUjBNj9iJF+fqufweKds+ocNiPluQY929DxVi+IuFoyvKjA2A1GzABdbD62Vgf4aq+EmKOGVihB8w6f1HpUtxLjSuuWKPILc9yADbqEUWVtTqLXudK6f8Ag+UIrsyBSAW82Zb20tbpfe9faLxQp7lcxOUidMouCveLpDFYmnWwrgYgOMwPKJtMxJIgHOFO4nhCYgi9pmAtJK3Kg6jIV1BBOw0NyCa48LwTC4d2cTTvIgLExBQEA81yeXTsSTU3x/FLhMMoReQMqW25bE2v0va1/WoHi3FHjwyPlVZJipCgcqQpqgsd7nX1uaxMO6tXYGtJDCd0XjneBlGgAAgXyXQjFljT2iGi5AzjjAvlMRwXVxvhqzhHlbEKF8rskLA5iLAiI5iCbfjWzh3DhET4JjgZhljcc6u2pYOz8wbsulvvaiuj4Vxf7ThGjawZbobdAdVIHp/tXRw+SDElwwAnVcko2caFSykd+jDoflXh9Z1MPouBhpIORscjFreXCCZXwVyacTb73yK+a46VmkYu2dr6te9/Y9u1Wn4f4WkYWaQqOS5JvyjzH55bD0z1wY/4RxCGQgDw0vZjYZltfQb3/pXjh3HVUWlXxLAZb2ygbk5GFixsOY39hat2s749ENw5kaxFrcNPea5/BNbhsTUq4ohu98pJm0yb5iBETHAcFZMQ5iQTSeGLR5QGsQb2JtlN2JsotYAZd7a1R+JY953LyEE20AFgAOgHQU4jixK5cIqaWsN7ep/oAPSpT4a4OJT40ukKEe8jXFkA63On5da+0aNPBtNap83IDX/HM3J5qLGYl20aow2H+XMmPduGUm+SmPhXhhjiznSWcWXukWhL/pv92pMcPLrHIqmzyEEDdYDGUi09AEPpc12ywsQFItJPowH/AC8OvmUfiF9Sx7VycXmeBZkQWaZ1SH95lCtp93LesOtVe529Pbdfu+XwGcaxNl0WGptptbTp5fTX3yJTH4rPhyAbnET+Cn7nlYj+BGPzrt4lHncIoLWWxFsq2+/Jvl25F3trpUZhIg+LCrbwsFHlBOgMlrHX0AP41vnkknZEFnLNZLA+Gp3zi/8AiFRc5jZbgWF6jp0nGqGszz73Zf8AiJzETbnLUaBDctT35eUHvWrDYNpGkllYNEjKiLYBW8JvMR2Vs+VfS+psRLTzpNlSJld86kZSDlIYEsbbWAO/t6VL4P4fwqAKIYzlFrsAzfi1zUtDGqgBQAOgAsK6EbCJqsfUqTuRAAiw0z8YHFUauLDjLR005L2teqUroVRSlKURYvWM1ZtVVx6yx4tskzr4ih0DHPGSvK65Dt9Q8pG5qDE4hmHpmo/IZxeOa902b5gKzs2lVDD4KOVc8qh3bVmbzKeoB3XKdgLWtXUvH5s3htFFn7GWRc3qt4tR7E2qO4niM8gVofDdtQyTsquddDePI7dbMDp7VibTq0sZTDKVcNIvqJ9DbPVWqNN7CZHosNh5JVtmY4iDmjYGzTQkkAG+hb30va9sxrhxCfteGeNAoZDmRl5bSqdMyEZkYm/cb610RYzERzK7IjLHoxEiq+Vh5GGi7hCDcXttXviMbNKJY8NKpJ5wGiDfvIQ/m2uDo1tdRVOv8OvQFR72iq3n80ZEZTIOonorbCWOEdRGh4d/DSVDQ8SIaLHgWDWgxS9mGz29DUxHJ4SK9x4sbNIq388UkzKEv94EW+8F7VCzukeIZXWUYfEjLKHUqFe/nzeXUkag73r1wp3ikmw8uVjHD9EXuQ6rIJVPW+UdtrelUSC0is2xEEcxw1HZkg/6kdFeq02vbI0E9R+xMdI4KzYzBhl8WECSOUc8Z2cd9dnHrvaxtuKHxv4dKAywXeLqNc8Z6hhvp/571eOFcREUkgYAQNJlOukb8tm9Fe+vZj97SU4hwfXxIyVf7Q1uOzL9Yfp0tV9ralEfmcN8p+ZucWuCMyOBzAsQQsPE0KdYfCrDodfHQ6c18TBta3vp+VfROFcVaTASyTWbLnTa2YZbAHpcnTpvWrivAYnbNKhha9zIg+gb94brfqdPc17x+HK4N4Y4GIJzAxfSI2ouc3nvYX2I9TUOMxdHFspjdgyOGUiYd9r8Qodn7PqYRzu3vNOQ55zwPC2a08N4wuNhXDSKfEJXN9nKLZnv0NvzIrTxV8ezGSAN4J/wwgQ2QaKSGFxff51F8B46uERo3gUsx5ixykjbKQR01qGTiMiaJNIg+ykjKPyIqZmAeKrjTADQTG9cGcyLyDYCM+Oa81do06eHaKru0YndzBiSYNxw56Zq38AxmOWU+NHKyFT9VFsehvyj0361x8dxKxSjFJfxmYWyG8QAAEilyAGLAi4GxHcVC4DjLCRWmMkyg+R5GIJtobMSNKmOK/Ey4mIwrh1uRy5STlPQgAflX1+Fqsrh5YIIAcRYROXaueJy5FS4bHUn0/6TpdeN65npkZyhWT4h4/4OHSVFDeKOW+wBF7kdfa9fMGP6da+gz4D9owsMbI6FFBzuciqbWN7gsfaw9xWODcBiSxjXx3/6rj6BfVRu3pa/uKr4HEYfBUXWl0nvvaTkPXkotobPq4l4ZvgMGfGePgbX6gqA4J8Ol7SYi6RdF+vIegVd7H/x3q+4DBBV8WVRHHEt0j6RqBue727bbC9yT38P4RzZ5CWb7R6eij6o/Pa5NR3G8cJHVFF4UlVW10ke+3qqb+rADpU5Y+t/c4oQ0fKMt46NAOh1JzEgADOxhqNOi34VARxOvjxXFJN46yNf6VzouxSOORAVJ7re59WNRM/Eg7y406xwgw4cfbkN+ce/ftXjjEjvIkMRjzTI+cpcBEklDFumpA17n3rC5JMRHCiyNh8KNAilvElGhJPl0N9Sd/eqUF5NR95k9BYEcMxujlK2qVNrWSRmMuAyPiRA7zzXfg0/ZcKBIqlpCZJC/NzE3sEF2dhpoPxrt8GWJM2ZhiJwdTqYIRbMQBorHl0HUjfLXnAxMJfFkw87ZbZAxiLE/acl9wdkHKN99vE+PxEk5kRIlWT6NS0gZ+UEsoUct82cnU2AGm9XKBp0aLqzXtNU8x2Z1NzBAlVHuc95nqZi/AD6+HXtxmDjiiaSNQrqCyuPMW6Xbdsx0IN739auER5RftVI4bNkkyiHxZBqS85ZUOluUR5EbXQAA71JPx6bNkEUOc9PGckerZYtB72q5syrRwbHNq1w6b65cdTfMqnWpveRA7yrRmrN6qeGE0mKjDzM2RTI6pdIxe6ouUb3NzzE+WrWK2sLiGYimKjMjlz5qtUZuECV6pWKVYUazUXxvAGZOTSRDmjPr1BP2WFwfQ1KVgivL2B7S11wV9a4tIIVRMySxtnjuV88ZXMysOmXv2I9CKjTKrWjAmeNiAUmil01GqyFbi2/Nf3FWviXB0lOcExyDQSJYG3ZgdGX0I9qq3E+HSIT4rOpJ0mEkxgPoUDjwz/l9eg47E7GqYUlzDvMz17POI04jv56VGox1pg+8vc9VniGEWMDNKM5uqNKOVlO0UrbMNbAnX31vhcBLZcugC3TM18t/NC9vMnY7i1cWIWWE5nu8egLMSUYHdbSYjf5V2cExsPiMqLNEoUHK5Xwt/qamx9BYelZzg9tLeYd6NQLdNCPNWC127IvC14HEmEZZVbwCcvPqYW+w5O8e2VtegNbeI/DEblZIWMLpqmX/D9imwU9cttzU4crg3ysp0OxB7+lcPHTaAgcoZkTtYNIiG3yaqzcU81AWHdJMG9jpJHHjZeGVDvgtMHx8lHpi5JY2tGkaE2kkILrJspZFWxZdPM1vmBetyT+GFQ4rEMAAL5lAy20e6qMy3sCbm3XvWeLsA0cY5QLZbZQRra6kOGFhcbEd67ZIFRVChQL8zWAtcG7aCwuQAdt6sU8UaTQactDtAYsMpNzPCDysvhIgWt74rjkDjmE04NiSrBHFxuNRe5Guh1G1cpPh3Z1AGpaTCkrsASzxdbXGvPuKmxhV+8dtc7enr6D8+5rh4xAghl5jcRvYFiT5D0J10H61XbXD3doTPK/iL+JKMdeFqxJFrmRJAB5ZIczf5QP9NcTYHDjX9nwQJ75oz+HhXrqxB+jba2U6aWGh6ZB+RrdE1gLG2mwv/8Aon+9Smwz10MegC9SIuo18Jhwub9mwhA3IV5B3/6dSEcgUaSpHpfLBDZ7exuf8tauIm8Ul7Hkbe1xoftKGrLn6MjS2Xa4tt+5l/OvUAtvqYvfhxBX0EQDz98VrzZyCiZtRaTFFjv5SkW+/Xk2rfGWPMZpzyg5YwirzHlA0Juf3tBqa7cNHGwBzXJUbMR0NtB7mt5wq/e/mb19f70qH8wG/KCD06+7QvBdooszl8yLip1BuM2ZSLWIZrspsAdM2lztetIxLxRD6OOWJbBHVSgS2gkZWvyDfOt99ra1KrCrhgQGW+hIBvbUbixsdt9u964eFv8ASSJfMNQScpJ6XYlix00sFA9KsPxRrNO+S7d0JnPODmPGNIKNiDa3vgtOB+G0zNNMxmkk1b/pW3yheqjS177CvGOxXiKY4VYQKcrGMWMjXt4Udth9ptANh1tJ8DP0RXcJK8Q/dVyq/kAPlXaAqLplVQPQAD9AKqOxJFQ7/aIy0A7vIW4r0+od7tGSMv4yUA3DptcxOqc+VraDaCK/l+85sT/p9cOwiuCFkAkACkxDliX/AKcRIsDoLka+2lvXG8bEGQMJJFIN1iYeH085uL+xNu4rhgEuIa8fJHqAVOVFAvykRYjfp5att+I6lvO7IPIeHEnwE969AO3ZNvBdjOsd47SogJ5YYpSW7lpQtyTvob3+sakEnjijBVCubyxlbO7dBlOuY9z7nqaj+H8PkkNomd2B1l8WcQLa2ljIfEO+g06EirTgODJG3iMTJL9traeijZR7b21vWhhtjVcTBeYZMk/q6DnxPcq9aoxmt+H3TgeAMaFpLGWQ5n7DQAID9lRp+J61LCgrNdjTY2m0MaIAWa5xcZKUpSva+JSlKIsWrw8YIsRcdjWylEVfm+HgusEhj65CM8V/RTqvspA9K45+CTsSWhwjki2fVW99Ub9TVqIpaqFbZeFqu33MvykehU7MTUbr765qj/8AC04y5fDiym9/GdyNCNA0eVflauBMBNIGSOYeEx5pbMxa23hmR2Oh+tYDa16u3H4WfDyqguxUgDa/cX9dvnVfPF4QtkYGS1liH+JmtouTcfPYVibYZ+XDW0Ke85xzMugzOus3urtHEVHiTnPDzP04LhfFl4rSjLZiokNxDJlcqSSuo1B5GIue41rpTxAAEkV1OmblI21YgWAUbKo3O5qz8IwXhQRxnUheY92OrfiSaxJwbDk3MEJPfw1v+lTO2ADG46ORE3PDVQ/mmybeH7qsYrEIoGcQLoxCsVvc6KvuSbkj21rRjWd4ZSkbFBHJd8vhpbJqeazN9YjKLG+/Wrph+HxR+SKNf3UUfoK3sgIsQCDoR+te6P4fpMMvdPS3qSSvJxQ/xCpE55G38p6nsemb07V7XYf7k/8A9VaBwmEG/hj21y/y7D8Ky/CIT/ywP3eX/TaoTsB5H/Jfv+hXv823gVUeIm0Un7jdT9k/eNepDyE6+Xue3bN/tVsXhUI/5anrzc1v5r2rz/8ASIb3yD21K/y3y/lX3/8ABqBoAqXnn9+S+fmxwKrbeLGAZYiFsvMoMkdhvoBnBI7rbTetWGmRxyjDuQASBluCDZhbobHT5g1eMtc2J4fFJ54kf95VP6ipq/4fovM0nFvLMfQheBiuIVUYyG4aRUQdeUabhhuPRlPuDXNDi/DjPgjPzBTItzBECcoa56Akcik29BercnBMMDcYeIHv4a/0rZxLBCWGSLYMhUW6aaEexsa8N/D7b7z5HANi/O5JXsYpsjs27lRJOHTRDK82aENcS5WDITcsXMbqbXPm13NxbWu5fhic3LGOUNYg+NIlxbS+VLMNvNet8fFowlpWCyAWeM+fNsVC7tc7WBvcVPfDsDJh41YWOpCndVJJVPkpA+VQ7IYcRvsr04LTmJbJ7ovabcuSlr4io0SDHd5iMlEYfgcy5csOFQjTPqze+ka6/OuyL4ezf48hkHWNRkjPuAczexYj0qftQCtqlsvC0377WX5kn1KpuxNR2vvqvEUQUWAAA2AFgPYVstWaVfUCxas0pREpSlESlKURKUpREpSlEWCK1+GN7a1tpREpSlESlKURKUpREpSlESlKURKwRWaURavCF72171sFZpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlESlKURKUpREpSlEX/2Q==">
            Hi
          </Avatar>
          <Text size="normal" className="font-semibold mb-4">
            Công an phường Khuê Trung
          </Text>
          <Button
            className="chat-button"
            variant="primary"
            size="small"
            onClick={handleOpenChat}
          >
            Nhắn tin
          </Button>
        </Box>
      </Box>
    </Page>
  );
}

export default ChatPage;
