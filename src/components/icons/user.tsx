import { Box } from "@chakra-ui/react";
import { ChakraProps } from "@chakra-ui/system/dist/types/system.types";

export const UserIcon = (props: ChakraProps) => (
  <Box
    as={"svg"}
    aria-hidden="true"
    focusable="false"
    data-icon="user"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      fillOpacity="0.4"
      d="M352 128c0 70.69-57.3 128-128 128C153.3 256 96 198.7 96 128s57.31-128 128-128C294.7 0 352 57.31 352 128z"
    ></path>
    <path
      fill="currentColor"
      fillOpacity="1"
      d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
    ></path>
  </Box>
);
