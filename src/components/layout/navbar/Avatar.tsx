
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(
  name: string,
  size: 'small' | 'medium' | 'large' = 'small' //Default is 'small'
) {
  const sizeVariants = {
    small: { width: 40, height: 40 },
    medium: { width: 56, height: 56 },
    large: { width: 96, height: 96 },
  };

  const { width, height } = sizeVariants[size];

  return {
    sx: {
      width,
      height,
      bgcolor: stringToColor(name),
    },
    children: name?.charAt(0), // Display only the first character of the name
  };
}

//not use now
//Kent Dodds -> KD
// export function stringAvatar(name: string) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

//notuse now
// export default function BackgroundLetterAvatars() {
//   return (
//     <Stack direction='row' spacing={2}>
//       <Avatar {...stringAvatar('Kent Dodds')} />
//       <Avatar {...stringAvatar('Jed Watson')} />
//       <Avatar {...stringAvatar('Tim Neutkens')} />
//     </Stack>
//   );
// }
