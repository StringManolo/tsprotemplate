let s:plugin_root = expand('~/.vim/plugged/vim-test')

if isdirectory(s:plugin_root)
  set runtimepath+=~/.vim/plugged/vim-test
  runtime! plugin/test.vim
endif

let test#strategy = "vimterminal"
let test#vim#term_position = "topleft 5"

let mapleader = ","

nnoremap <leader>tn :TestNearest<CR>
nnoremap <leader>tf :TestFile<CR>
nnoremap <leader>ts :TestSuite<CR>
nnoremap <leader>tl :TestLast<CR>

function! SetupTDD()
  nnoremap <leader>w :topleft 5split<CR>:term ++curwin npm run test:watch<CR>
  nnoremap <leader>t :topleft 5split<CR>:term ++curwin npm run test<CR>
  tnoremap <Esc> <C-w>N
  command! TDDStatus echo "Modo TDD: ON"
endfunction

call SetupTDD()
