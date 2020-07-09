<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<%
ArrayList<String> send = (ArrayList<String>)session.getAttribute("send");
ArrayList<String> time = (ArrayList<String>)session.getAttribute("time");
ArrayList<String> name = (ArrayList<String>)session.getAttribute("name");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>孤独の掲示板</title>
<style>
h1 {
	color: #00FF3B;
	border-bottom: dashed 5px #77F9C3;
}
h3 {
	padding: 0.25em 0.25em;
	color: #494949;
	background: transparent;
	border-left: solid 5px #77F9C3;
}
table th, table td{
	background-color: #E6FFE9;
}
ul {
	background: #fcfcfc;
	padding: 0.5em 0.5em 0.5em 2em;
	border: solid 3px gray;
}
</style>
</head>
<body>
<h1>孤独の掲示板</h1>
<form action="/s1832099/Keijiban" method="POST">
ユーザネーム：
<input type="text" size="10" maxlength="10" name="name" value="名無しの兎"/>
※名前の文字数制限は10文字です。<br>
<input type="text" size="50" name="message" />
<input type="submit" name="action" value="送信">
<input type="submit" name="action" value="初期化">
</form>
<hr>
<table border="2" style="border-color: lime">
	<tr>
		<th width="30">No.</th>
		<th width="100">投稿時刻<br>(日本標準時)</th>
		<th width="200">ユーザネーム</th>
		<th width="350">発言</th>
	</tr>
<% if(send != null){ %>
<% for(int i=0; i<send.size(); i++){ %>
<tr><td align = "center" width="30"><%= i+1%></td>
<td align = "center"><%= time.get(i)%></td>
<td align = "center" width="200">[<%= name.get(i) %>]</td>
<td width="350"><%= send.get(i)%></td></tr>
<%}
}%>
</table>
<hr>
<h3>追加した機能一覧</h3>
<ul>
<li>掲示板へ書き込む際にユーザネーム欄を追加。（入力しなかった場合はNull-Nameとなる。
そもそも入力しなくてもすでにテンプレートとして名前が与えられている。また、発言も入力しなければNull-Messageとなる。）</li>
<li>書き込みの一斉初期化機能を追加。「初期化」ボタンで書き込みをすべて削除できる。</li>
<li>書き込みと同時に日付を記録し、それも共に掲示板へ出力する。
これによって、「No.,投稿時刻,ユーザネーム,発言」の形式で表示される。</li>
<li>掲示板をテーブル表示にし、また枠の幅を制限するなどして発言の文字数が多い場合でも自動的に見やすくするようにした。</li>
</ul>
</body>
</html>